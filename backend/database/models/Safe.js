const mongoose = require('mongoose');

const safeSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'user',
		},
		safeName: {
			type: String,
			required: [true, 'Please add safe name'],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('safe', safeSchema, 'safes');
