
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('./db.js')
const User = require('./models/user.model')
const Certification =require('./models/certification.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())


app.post('/api/signup', async (req, res) => {
	console.log(req.body);
	try {
	  const existingUser = await User.findOne({ email: req.body.email });
	  if (existingUser) {
		return res.status(409).json({ status: 'error', error: 'Email id already exists' });
	  }
  
	  const newPassword = await bcrypt.hash(req.body.password, 10);
	  await User.create({
		name: req.body.name,
		email: req.body.email,
		password: newPassword,
	  });
	  res.json({ status: 'ok' });
	} catch (err) {
	  res.json({ status: 'error', error: 'Something went wrong' });
	}
  });

app.post('/api/signin', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
	if (!user) {
		return { status: 'error', error: 'Invalid Signin' }
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
});

app.post('/api/register', async (req, res) => {
	try {
	  const { title } = req.body;
	  const certification = new Certification({
		title,
	  });
	  await certification.save();
	  res.status(201).json({ message: 'Registered successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Registration failed' });
	}
  });
  


app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})