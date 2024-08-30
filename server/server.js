const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Hospital = require('./models/Hospital');
const User = require('./models/User');
const Doctor = require('./models/Doctor'); // Import Doctor model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital-directory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
  alert(`Error connecting to MongoDB: ${err.message}`);
});

// Status route
app.get('/status', (req, res) => {
  res.status(200).json({ message: 'Server Online' });
});

app.post('/register', async (req, res) => {
  try {
    const { type, Name, ContactNumber, Email, Address, Password, Specialization } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);

    let existingUser;
    if (type === 'User') {
      existingUser = await User.findOne({ Email });
    } else if (type === 'Hospital') {
      existingUser = await Hospital.findOne({ Email });
    } else if (type === 'Doctor') {
      existingUser = await Doctor.findOne({ Email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    let newUser;

    if (type === 'User') {
      newUser = new User({
        Name,
        ContactNumber,
        Email,
        Address,
        Password: hashedPassword,
      });
    } else if (type === 'Hospital') {
      const hospitalId = await generateHospitalId();
      newUser = new Hospital({
        Hospital_ID: hospitalId,
        HospitalName: Name,
        HospitalContactNumber: ContactNumber,
        Email: Email,
        Address: Address,
        Password: hashedPassword,
        doctors: [],
      });
    } else if (type === 'Doctor') {
      const hospital = await Hospital.findOne({ 'doctors.Email': Email });

      if (!hospital) {
        const message = 'Hospital not found for this doctor. Try registering as part of a Hospital';
        return res.status(404).json({ message });
      }

      // Retrieve the specialization from the hospital's doctors array
      const doctorDetails = hospital.doctors.find(doc => doc.Email === Email);
      if (!doctorDetails) {
        const message = 'Doctor details not found in the hospital\'s doctors array';
        return res.status(404).json({ message });
      }

      newUser = new Doctor({
        Doctor_ID: doctorDetails.Doctor_ID,
        Doctor_Name: Name,
        Specialization: doctorDetails.Specialization, 
        Email,
        HospitalName: hospital.HospitalName,
        Hospital_ID: hospital.Hospital_ID,
        Password: hashedPassword,
      });

      // Optionally, you might want to update the hospital's doctors array with the new doctor
      hospital.doctors.push({
        Doctor_ID: newUser.Doctor_ID,
        Doctor_Name: Name,
        Specialization: doctorDetails.Specialization,
        Email,
      });
      await hospital.save();
    }

    await newUser.save();
    res.status(201).json({ message: `${type} registered successfully` });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
});



// Doctor registration route
app.post('/register-doctors', async (req, res) => {
  const { hospitalId, doctors } = req.body;

  try {
    const hospital = await Hospital.findOne({ hospitalId });

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Generate Doctor_ID for each doctor and include other details
    const updatedDoctors = doctors.map((doctor, index) => ({
      Doctor_ID: generateDoctorId(hospital.Hospital_ID, index),
      Doctor_Name: doctor.name,
      Specialization: doctor.specialization,
      Email: doctor.email,
      HospitalName: hospital.HospitalName,
      Hospital_ID: hospital.Hospital_ID,
    }));

    hospital.doctors.push(...updatedDoctors);
    await hospital.save();

    // Save each doctor in the Doctor collection as well
    for (const doctor of updatedDoctors) {
      const newDoctor = new Doctor({
        Doctor_ID: doctor.Doctor_ID,
        Doctor_Name: doctor.Doctor_Name,
        Specialization: doctor.Specialization,
        Email: doctor.Email,
        HospitalName: doctor.HospitalName,
        Hospital_ID: doctor.Hospital_ID,
      });
      await newDoctor.save();
    }

    res.status(200).json({ message: 'Doctors registered successfully' });
  } catch (error) {
    console.error('Error registering doctors:', error);
    res.status(500).json({ message: 'Error registering doctors', error });
  }
});

// Generate Hospital_ID
const generateHospitalId = async () => {
  const count = await Hospital.countDocuments();
  const hospitalNumber = (count + 1).toString().padStart(2, '0'); 
  return `A${hospitalNumber}`; 
};

// Generate Doctor_ID
const generateDoctorId = (hospitalId, index) => {
  const doctorNumber = (index + 1).toString().padStart(3, '0');
  const hospitalPrefix = hospitalId.toUpperCase();
  return `${hospitalPrefix}${doctorNumber}`;
};

app.post('/login', async (req, res) => {
  try {
    const { type, Email, Password } = req.body;
    let user;

    if (type === 'User') {
      user = await User.findOne({ Email });
    } else if (type === 'Hospital') {
      user = await Hospital.findOne({ Email });
    } else if (type === 'Doctor') {
      user = await Doctor.findOne({ Email });
    }

    if (!user) return res.status(400).json({ message: `${type} not found (Login Failed)` });

    const match = await bcrypt.compare(Password, user.Password || user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      type: 'Welcome', // Include type in response
      hospitalId: type === 'Hospital' ? user.Hospital_ID : undefined,
      doctors: type === 'Hospital' ? user.doctors : [],
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Fetch doctors for a specific hospital
app.get('/doctors/:hospitalId', async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findOne({ HospitalEmail: hospitalId });

    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    const doctors = hospital.doctors || [];
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});

app.get('/getDoctorsForHospital', async (req, res) => {
  try {
    const { hospitalId } = req.query;
    const doctors = await Doctor.find({ Hospital_ID: hospitalId });
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});

app.get('/getUsersForDoctor', async (req, res) => {
  try {
    const { doctorId } = req.query;
    const users = await User.find({ Appointment_Doctor_ID: doctorId });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
app.get('/searchDoctors', async (req, res) => {
  try {
    const { filter } = req.query;
    const doctors = await Doctor.find({ $text: { $search: filter } });
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error searching doctors:', error);
    res.status(500).json({ message: 'Error searching doctors', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
