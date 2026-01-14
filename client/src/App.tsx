import axios from "axios";
import { useState } from "react";

interface FormShape {
  name: string;
  email: string;
  age: string;
  message: string;
}

const App = () => {
  const [formData, setFormData] = useState<FormShape>({
    name: "",
    email: "",
    age: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emptyMessageCheck = formData.message.trim();
    const emptyNameCheck = formData.name.trim();
    const emailCheck = formData.email.includes("gmail.com");
    const ageCheck = formData.age.trim();

    if (!emptyMessageCheck || !emptyNameCheck || !emailCheck || !ageCheck) {
      alert("Some fields were not entered");
      handleClear();
      return;
    }

    axios
      .post("http://localhost:3001/createUser", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="border-2 rounded-2xl w-50 p-3"
            value={formData?.name}
            onChange={handleChange}
          />

          <label htmlFor="name">Age</label>
          <input
            type="number"
            name="age"
            className="border-2 rounded-2xl w-50 p-3"
            value={formData?.age}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="border-2 rounded-2xl w-50 p-3"
            value={formData?.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            className="border-2 rounded-2xl w-50 p-3"
            value={formData?.message}
            onChange={handleChange}
          ></textarea>

          <button className="bg-green-500 px-5 py-2 rounded-2xl flex justify-center w-full mt-3 text-white">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
