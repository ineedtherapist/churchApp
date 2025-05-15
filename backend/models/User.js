const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Login Schema - matches the provided database structure
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Password Schema - matches the provided database structure
const PasswdSchema = new mongoose.Schema({
  passwd: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'login',
    required: false // Making it optional to support existing passwords
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Create a virtual User model that combines login and passwd
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [1, 'Password is required']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Method to compare entered password with password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return enteredPassword === this.password;
};

// Create admin user if not exists
UserSchema.statics.createAdminUser = async function() {
  try {
    // Check if admin exists in login collection
    const Login = mongoose.model('login', LoginSchema);
    const Passwd = mongoose.model('passwd', PasswdSchema);

    const adminLogin = await Login.findOne({ name: 'admin' });

    if (!adminLogin) {
      // Create admin in login collection
      await Login.create({ name: 'admin' });
      // Create admin in passwd collection
      await Passwd.create({ passwd: 'admin' });
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Create models for login and passwd collections
const Login = mongoose.model('login', LoginSchema);
const Passwd = mongoose.model('passwd', PasswdSchema);

// Export a combined User model
module.exports = {
  Login,
  Passwd,
  User: mongoose.model('User', UserSchema)
};
