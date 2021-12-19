import UserData from '../model/UserData.js';

const login = async (inputUserEmail) => {
    return await UserData.findOne({ email: inputUserEmail });
};


const addUser = async (inputUser) => {
    console.log("here is request data");
    const newUserData = new UserData({
        name: inputUser.name,
        email: inputUser.email,
        iban: inputUser.iban
    });
    console.log("here is data", JSON.stringify(newUserData))
    return await newUserData.save();
};

export default {
    login,
    addUser


};