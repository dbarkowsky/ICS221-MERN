import mongoose from 'mongoose';
const courseModel = mongoose.model('course');

// GET Request Handler
export const getAllCourses = async (req, res) => {
    try {
        let courses = await courseModel.find({}, '', { sort: { _id: -1 } }).exec();
        return res.status(200).json(courses);
    } catch (err) {
        return res.status(400).send('Bad Request');
    }

};

// POST Request Handler
export const addNewCourse = async (req, res) => {
    try {
        // does this course code already exist?
        let existingCourse = await courseModel.exists({ code: req.body.code }).exec();
        // if yes, return 403
        if (existingCourse) return res.status(403).send('Forbidden. A course with that course code already exists.');
        // Add course
        let course = await courseModel.create(req.body);
        return res.status(201).json(course);
    } catch (err) {
        return res
            .status(400)
            .send('Bad Request. The course in the body of the \
        Request is either missing or malformed.');
    }
};
