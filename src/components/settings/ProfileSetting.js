import { useContext, useEffect, useState } from "react";
import { FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Divider, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { AppContext } from "../../App";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { timezones, countries, spokenLanguages } from "../../useful/data";
import axios from "axios";
import "./Setting.scss";
import { useToast } from "@chakra-ui/toast";

const ProfileSetting = () => {
  const { mainData, setMainData } = useContext(AppContext);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    gender: "male",
    birthday: "",
    timezone: "GMT+00:00",
    country: "Afghanistan",
    language: "English",
    bio: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    birthday: "",
    timezone: "",
    country: "",
    language: "",
    bio: "",
    submit: "",
  });
  const toast = useToast();

  useEffect(() => {
    document.title = "Profile Setting - E-Pal";

    axios
      .get("/user-data")
      .then((res) => {
        setMainData(res.data);

        setValues({
          firstname: mainData?.firstname || "",
          lastname: mainData?.lastname || "",
          gender: mainData?.gender || "male",
          birthday: mainData?.birthday || "",
          timezone: mainData?.timezone || "GMT+00:00",
          country: mainData?.country || "",
          language: mainData?.language || "English",
          bio: mainData?.bio || "",
        });
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setValues({
      firstname: mainData?.firstname || "",
      lastname: mainData?.lastname || "",
      gender: mainData?.gender || "male",
      birthday: mainData?.birthday || "",
      timezone: mainData?.timezone || "GMT+00:00",
      country: mainData?.country || "",
      language: mainData?.language || "English",
      bio: mainData?.bio || "",
    });
  }, [mainData]);

  const handleInputs = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRadioGroup = (value) => {
    setValues({ ...values, gender: value });
  };

  const handleSave = () => {
    setErrors({
      firstname: "",
      lastname: "",
      gender: "",
      birthday: "",
      timezone: "",
      country: "",
      language: "",
      bio: "",
      submit: "",
    });

    const {
      firstname,
      lastname,
      gender,
      birthday,
      timezone,
      country,
      language,
      bio,
    } = values;

    const currErrors = {
      firstname: "",
      lastname: "",
      gender: "",
      birthday: "",
      timezone: "",
      country: "",
      language: "",
      bio: "",
      submit: "",
    };

    if (firstname === "") currErrors.firstname = "Please enter your first name";
    if (lastname === "") currErrors.lastname = "Please enter your last name";
    if (gender === "") currErrors.gender = "Please select your gender";
    if (birthday === "") currErrors.birthday = "Please enter your birthday";
    if (timezone === "") currErrors.timezone = "Please select your timezone";
    if (country === "") currErrors.country = "Please enter your country";
    if (language === "") currErrors.language = "Please enter your language";
    if (bio === "") currErrors.bio = "Please enter your bio";

    setErrors(currErrors);

    if (
      firstname === "" ||
      lastname === "" ||
      gender === "" ||
      birthday === "" ||
      timezone === "" ||
      country === "" ||
      language === "" ||
      bio === ""
    )
      return;

    if (
      firstname === mainData.firstname &&
      lastname === mainData.lastname &&
      gender === mainData.gender &&
      birthday === mainData.birthday &&
      timezone === mainData.timezone &&
      country === mainData.country &&
      language === mainData.language &&
      bio === mainData.bio
    ) {
      toast({
        title: "Nothing to be changed",
        status: "info",
        duration: 3000,
      });
      return;
    }

    axios
      .put("/user-profile-data", values)
      .then((res) => {
        toast({
          title: "Profile updated successfully",
          status: "success",
          duration: 3000,
        });

        axios
          .get("/user-data")
          .then((res) => {
            setMainData(res.data);
          })
          .catch((err) => {
            toast({
              title: "Error occured when fetching user data",
              status: "error",
              duration: 3000,
            });
          });
      })
      .catch((err) => {
        setErrors({ ...currErrors, submit: "An error occured" });
      });
  };

  const handleChangeAvatarClick = () => {
    toast({
      title: "Not implemented yet",
      status: "info",
      duration: 2000,
    });
  };

  return (
    <div className="main-content profile">
      <h1>Profile</h1>

      <div className="avatar-section">
        <h2>Avatar</h2>

        <div className="avatar-text">
          <img
            src="/assets/imgs/default-avatar.png"
            style={{ zIndex: "1" }}
            alt=""
          />

          <div>
            <p>
              Avatar must be .JPG, .JPEG or .PNG
              <br />
              and cannot exceed 5M.
            </p>
            <button onClick={handleChangeAvatarClick}>Change Avatar</button>
          </div>
        </div>
      </div>

      <Divider />

      <div className="information-section">
        <h2>Profile Information</h2>

        <FormControl id="firstname" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            First Name
          </FormLabel>
          <Input
            placeholder="Please enter your first name"
            size="sm"
            variant="filled"
            name="firstname"
            value={values.firstname}
            onChange={handleInputs}
          />
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.firstname}
          </FormHelperText>
        </FormControl>

        <FormControl id="lastname" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Last Name
          </FormLabel>
          <Input
            placeholder="Please enter your last name"
            size="sm"
            variant="filled"
            name="lastname"
            value={values.lastname}
            onChange={handleInputs}
          />
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.lastname}
          </FormHelperText>
        </FormControl>

        <FormControl id="gender" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Gender
          </FormLabel>
          <RadioGroup onChange={handleRadioGroup} value={values.gender}>
            <Stack direction="row">
              <Radio colorScheme="blue" value="male">
                Male
              </Radio>
              <Radio colorScheme="blue" value="female">
                Female
              </Radio>
              <Radio colorScheme="blue" value="other">
                Other
              </Radio>
            </Stack>
          </RadioGroup>{" "}
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.gender}
          </FormHelperText>
        </FormControl>

        <FormControl id="birthday" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Birthday
          </FormLabel>
          <Input
            size="sm"
            variant="filled"
            name="birthday"
            type="date"
            placeholder="dd-mm-yyyy"
            value={values.birthday}
            onChange={handleInputs}
          />
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.birthday}
          </FormHelperText>
        </FormControl>

        <FormControl id="timezone" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Time Zone
          </FormLabel>
          <Select
            size="sm"
            variant="filled"
            name="timezone"
            onChange={handleInputs}
          >
            {timezones.map((timezone) => (
              <option selected={timezone === mainData?.timezone} key={timezone}>
                {timezone}
              </option>
            ))}
          </Select>
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.timezone}
          </FormHelperText>
        </FormControl>

        <FormControl id="country" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Country
          </FormLabel>
          <Select
            size="sm"
            variant="filled"
            name="country"
            onChange={handleInputs}
          >
            {countries.map((country) => (
              <option selected={country === mainData?.country} key={country}>
                {country}
              </option>
            ))}
          </Select>
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.country}
          </FormHelperText>
        </FormControl>

        <FormControl id="language" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Spoken Language
          </FormLabel>
          <Select
            size="sm"
            variant="filled"
            name="language"
            onChange={handleInputs}
          >
            {spokenLanguages.map((language) => (
              <option selected={language === mainData?.language} key={language}>
                {language}
              </option>
            ))}
          </Select>
          <FormHelperText color="red.500" mt="0.3rem" fontSize=".8rem">
            {errors.language}
          </FormHelperText>
        </FormControl>

        <FormControl id="bio" width="lg">
          <FormLabel fontSize=".9rem" color="#aa8da4">
            Bio:
          </FormLabel>
          <Textarea
            placeholder="Write a short bio to introduce yourself"
            variant="filled"
            fontSize=".8rem"
            mb="0"
            name="bio"
            value={values.bio}
            onChange={handleInputs}
          />
          <FormHelperText color="red.500" mt="0" fontSize=".8rem">
            {errors.bio}
          </FormHelperText>
        </FormControl>

        <button className="submit-btn" onClick={handleSave}>
          Save Changes
        </button>
        <p className="submit-error">{errors.submit}</p>
      </div>

      <Divider />

      <div className="details-section">
        <div>
          <p>Name:</p>
          <p>
            {mainData?.firstname && mainData.firstname}{" "}
            {mainData?.lastname && mainData.lastname}
          </p>
        </div>
        <div>
          <p>Country:</p>
          <p>
            {mainData?.country && mainData.country}
            {mainData?.language && ` (${mainData.language})`}
          </p>
        </div>
        <div>
          <p>Birthday:</p>
          <p>{new Date(mainData?.birthday).toLocaleDateString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
