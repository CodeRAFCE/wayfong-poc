import {useEffect, useId, useState} from "react";
import {Controller, FormProvider, useFieldArray, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {FormProp} from "../types/form.type";
import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	IconButton,
	InputAdornment,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import {Plus, Trash} from "lucide-react";
import usflag from "/usflag.jpg";

const DUMMY_DROPDOWN = ["Weekly", "Semi - Monthly", "Monthly", "Quarterly"];

// const options = [
// 	{label: "9:00 AM - 11:00 AM", value: "morning1"},
// 	{label: "11:00 AM - 1:00 PM", value: "morning2"},
// 	{label: "1:00 PM - 3:00 PM", value: "afternoon1"},
// 	{label: "3:00 PM - 5:00 PM", value: "afternoon2"},
// 	{label: "5:00 PM - 7:00 PM", value: "evening1"},
// 	{label: "7:00 PM - 9:00 PM", value: "evening2"},
// ];

const timeOptions = [
	{value: "time1", label: "9 AM - 11 AM"},
	{value: "time2", label: "11 AM - 1 PM"},
	{value: "time3", label: "1 PM - 3 PM"},
	{value: "time4", label: "3 PM - 5 PM"},
	{value: "time5", label: "5 PM - 7 PM"},
	{value: "time6", label: "7 PM - 9 PM"},
];

const Home = () => {
	const navigate = useNavigate();
	const formId = useId();
	const [statesUS, setStatesUS] = useState([]);
	const methods = useForm<FormProp>({
		mode: "onBlur",
		defaultValues: {
			companyName: "",
			contactPerson: "",
			phone: "",
			zipCode: "",
			city: "",
			state: "",
			country: "USA",
			email: "",
			address1: "",
			address2: "",
			landmark: "",
			products: [{preferredProducts: "", orderFrequency: "", quantity: ""}],
			preferredTime: [],
			business: "",
			anyOtherText: "",
			cookedFood: false,
			dimSum: false,
			general: false,
			grocery: false,
			meat: false,
			roastedMeat: false,
			seafood: false,
			tofu: false,
		},
	});

	const {
		handleSubmit,
		control,
		formState: {isValid, errors},
		watch,
		reset,
		clearErrors,
	} = methods;

	const values = watch();

	const {append, remove, fields} = useFieldArray({
		name: "products",
		control,
	});

	const onSubmit = async ({
		companyName,
		city,
		contactPerson,
		phone,
		state,
		zipCode,
		address1,
		address2,
		email,
		country,
		products,
		preferredTime,
		business,
		anyOtherText,
		landmark,
		cookedFood,
		dimSum,
		general,
		grocery,
		meat,
		roastedMeat,
		seafood,
		tofu,
	}: FormProp) => {
		// local storage logic
		const productDetails: FormProp = {
			id: formId.slice(0, 3),
			companyName: companyName,
			contactPerson: contactPerson,
			phone: phone,
			state: state,
			zipCode: zipCode,
			city: city,
			address1,
			address2,
			landmark,
			email: email,
			country,
			products,
			preferredTime,
			// others,
			// restaurant,
			// supermarket,
			business,
			anyOtherText,
			cookedFood,
			dimSum,
			general,
			grocery,
			meat,
			roastedMeat,
			seafood,
			tofu,
		};

		// Get existing items from localStorage or initialize an empty array
		const itemsInCompare: FormProp[] = JSON.parse(localStorage.getItem("itemsInCompare") || "[]");

		// Push the new form data object into the array
		itemsInCompare.push(productDetails);

		// Store the updated array back into localStorage
		localStorage.setItem("itemsInCompare", JSON.stringify(itemsInCompare));

		navigate("/thankyou");
		reset();
	};

	//   const validateCheckboxSelection = (value) => {
	// 	if (Array.isArray(value) && value.length >= 2) {
	// 	  return true; // Validation passed
	// 	}
	// 	return "Please select at least two options"; // Validation failed
	//   };
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

	useEffect(() => {
		const getUsStates = () => {
			const options = {
				method: "GET",
				headers: {
					"X-RapidAPI-Key": "b3e0d070afmsh543a7751331578fp14f00bjsnf76fcf609fcd",
					"X-RapidAPI-Host": "us-states.p.rapidapi.com",
				},
			};

			fetch("https://us-states.p.rapidapi.com/basic", options)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					console.log(data);
					setStatesUS(data);
				})
				.catch((error) => {
					console.error("There was a problem with the fetch operation:", error);
				});
		};

		getUsStates(); // Fetch data when the component mounts
	}, []);

	const handleCheckboxChange = (value: string) => {
		// if(values.preferredTime === false){
		// preferredTime.push(value);
		// console.log(preferredTime);

		if (selectedTimes.includes(value)) {
			setSelectedTimes(selectedTimes.filter((time) => time !== value));
		} else {
			setSelectedTimes([...selectedTimes, value]);
		}
	};
	//   const handleGetState = () => {
	//     console.log("handleGetState called");
	//     getUsStates();
	//   }

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-md mx-auto p-4">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
					<div className="w-full">
						<Controller
							control={control}
							name="companyName"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									label="Company Person*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											// Class for the border around the input field
											"& .MuiOutlinedInput-notchedOutline": {
												borderWidth: "1px",
												transition: "border-color 0.3s", // Add transition for smooth effect
											},
											"&:hover .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
											},
											"&.Mui-focused": {
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "#CA7229",
													borderWidth: "2px",
												},

												"& .MuiInputLabel-outlined": {
													color: "#CA7229",
													"&.Mui-focused": {
														color: "#CA7229",
													},
												},
											},
										},

										"& .MuiInputLabel-outlined": {
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									}}
								/>
							)}
						/>
					</div>

					<div className="w-full">
						<Controller
							control={control}
							name="contactPerson"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									label="Contact Person*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											// Class for the border around the input field
											"& .MuiOutlinedInput-notchedOutline": {
												borderWidth: "1px",
												transition: "border-color 0.3s", // Add transition for smooth effect
											},
											"&:hover .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
											},
											"&.Mui-focused": {
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "#CA7229",
													borderWidth: "2px",
												},

												"& .MuiInputLabel-outlined": {
													color: "#CA7229",
													"&.Mui-focused": {
														color: "#CA7229",
													},
												},
											},
										},

										"& .MuiInputLabel-outlined": {
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									}}
								/>
							)}
						/>
					</div>
				</div>

				{/* BUSINESS TYPE <CHECKBOX> */}
				<div className="w-full  mb-4">
					<label htmlFor="" className="font-semibold">
						Business Type*:
					</label>
					<div className="grid grid-cols-2 gap-2">
						<FormControl component="fieldset">
							<Controller
								rules={{required: true}}
								control={control}
								name="business"
								render={({field}) => (
									<RadioGroup
										{...field}
										onChange={(e) => {
											field.onChange(e);
											clearErrors("anyOtherText");
										}}
									>
										<div className="grid-cols-2 gap-8 w-full">
											<FormControlLabel
												value="restaurant"
												control={<Radio />}
												label="Restaurant"
												sx={{
													color: "#00AA5C",
													"&.Mui-checked": {
														color: "#00AA5C",
													},
												}}
											/>
											<FormControlLabel
												value="supermarket"
												control={<Radio />}
												label="Supermarket"
												onChange={() => field.onChange("supermarket")}
												sx={{
													color: "#00AA5C",
													"&.Mui-checked": {
														color: "#00AA5C",
													},
												}}
											/>
											<FormControlLabel
												value="others"
												control={<Radio />}
												label="Others"
												onChange={() => field.onChange("others")}
												sx={{
													color: "#00AA5C",
													"&.Mui-checked": {
														color: "#00AA5C",
													},
												}}
											/>
										</div>
									</RadioGroup>
								)}
							/>
						</FormControl>
					</div>
				</div>

				{/* <TEXTBOX> OTHER BUSINESS TYPE */}
				<div className="w-full mb-4">
					<Controller
						control={control}
						name="anyOtherText"
						rules={{
							required: {
								value: values.business !== "others" ? false : true,
								message: "This field is required!",
							},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								disabled={values.business !== "others"}
								label="Any other business type"
								{...field}
								fullWidth
								error={!!error}
								helperText={error?.message}
								size="small"
								InputProps={{
									className: `${values.business !== "others" ? "bg-black" : "bg-[#FDF0E1]"}`,
								}}
								sx={{
									display: values.business !== "others" ? "none" : "",
									"& .MuiOutlinedInput-root": {
										// Class for the border around the input field
										"& .MuiOutlinedInput-notchedOutline": {
											borderWidth: "1px",
											transition: "border-color 0.3s", // Add transition for smooth effect
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "#CA7229",
										},
										"&.Mui-focused": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
												borderWidth: "2px",
											},

											"& .MuiInputLabel-outlined": {
												color: "#CA7229",
												"&.Mui-focused": {
													color: "#CA7229",
												},
											},
										},
									},

									"& .MuiInputLabel-outlined": {
										"&.Mui-focused": {
											color: "#CA7229",
										},
									},
								}}
							/>
						)}
					/>
				</div>

				{/* PHONE NUMBER */}
				<div className="w-full mb-4">
					<Controller
						control={control}
						name="phone"
						rules={{
							required: {value: true, message: "This field is required!"},
							pattern: {
								value: /^[0-9]{10}$/, // Add your phone number validation pattern here
								message: "Invalid phone number format!",
							},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								type="number"
								label="Phone Number*"
								{...field}
								fullWidth
								error={!!error}
								helperText={error?.message}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
									startAdornment: (
										<InputAdornment position="start">
											<div className="flex items-center gap-2">
												<img src={usflag} className="h-4" /> +1
											</div>
											<div className="px-4">
												<Divider orientation="vertical" flexItem sx={{backgroundColor: "gray"}} />
											</div>
										</InputAdornment>
									),
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										// Class for the border around the input field
										"& .MuiOutlinedInput-notchedOutline": {
											borderWidth: "1px",
											transition: "border-color 0.3s", // Add transition for smooth effect
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "#CA7229",
										},
										"&.Mui-focused": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
												borderWidth: "2px",
											},

											"& .MuiInputLabel-outlined": {
												color: "#CA7229",
												"&.Mui-focused": {
													color: "#CA7229",
												},
											},
										},
									},

									"& .MuiInputLabel-outlined": {
										"&.Mui-focused": {
											color: "#CA7229",
										},
									},
								}}
							/>
						)}
					/>
				</div>

				<div className="w-full mb-4">
					<Controller
						control={control}
						name="email"
						rules={{
							required: {value: true, message: "This field is required!"},
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Invalid email address!",
							},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								label="Email Address*"
								{...field}
								fullWidth
								error={!!error}
								helperText={error?.message}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										// Class for the border around the input field
										"& .MuiOutlinedInput-notchedOutline": {
											borderWidth: "1px",
											transition: "border-color 0.3s", // Add transition for smooth effect
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "#CA7229",
										},
										"&.Mui-focused": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
												borderWidth: "2px",
											},

											"& .MuiInputLabel-outlined": {
												color: "#CA7229",
												"&.Mui-focused": {
													color: "#CA7229",
												},
											},
										},
									},

									"& .MuiInputLabel-outlined": {
										"&.Mui-focused": {
											color: "#CA7229",
										},
									},
								}}
							/>
						)}
					/>
				</div>

				<div className="w-full mb-4">
					<Controller
						control={control}
						name="address1"
						rules={{
							required: {value: true, message: "This field is required!"},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								label="Address Line 1*"
								{...field}
								fullWidth
								error={!!error}
								helperText={error?.message}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										// Class for the border around the input field
										"& .MuiOutlinedInput-notchedOutline": {
											borderWidth: "1px",
											transition: "border-color 0.3s", // Add transition for smooth effect
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "#CA7229",
										},
										"&.Mui-focused": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
												borderWidth: "2px",
											},

											"& .MuiInputLabel-outlined": {
												color: "#CA7229",
												"&.Mui-focused": {
													color: "#CA7229",
												},
											},
										},
									},

									"& .MuiInputLabel-outlined": {
										"&.Mui-focused": {
											color: "#CA7229",
										},
									},
								}}
							/>
						)}
					/>
				</div>

				<div className="w-full mb-4">
					<Controller
						control={control}
						name="address2"
						rules={{
							required: {value: true, message: "This field is required!"},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								label="Address Line 2*"
								{...field}
								fullWidth
								error={!!error}
								helperText={error?.message}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										// Class for the border around the input field
										"& .MuiOutlinedInput-notchedOutline": {
											borderWidth: "1px",
											transition: "border-color 0.3s", // Add transition for smooth effect
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "#CA7229",
										},
										"&.Mui-focused": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
												borderWidth: "2px",
											},

											"& .MuiInputLabel-outlined": {
												color: "#CA7229",
												"&.Mui-focused": {
													color: "#CA7229",
												},
											},
										},
									},

									"& .MuiInputLabel-outlined": {
										"&.Mui-focused": {
											color: "#CA7229",
										},
									},
								}}
							/>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					<div className="w-full mb-4">
						<Controller
							control={control}
							name="city"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									label="City*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											// Class for the border around the input field
											"& .MuiOutlinedInput-notchedOutline": {
												borderWidth: "1px",
												transition: "border-color 0.3s", // Add transition for smooth effect
											},
											"&:hover .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
											},
											"&.Mui-focused": {
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "#CA7229",
													borderWidth: "2px",
												},

												"& .MuiInputLabel-outlined": {
													color: "#CA7229",
													"&.Mui-focused": {
														color: "#CA7229",
													},
												},
											},
										},

										"& .MuiInputLabel-outlined": {
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									}}
								/>
							)}
						/>
					</div>

					<div className="w-full mb-4">
						<TextField
							select
							InputLabelProps={{shrink: true}}
							SelectProps={{
								native: false,
								sx: {textTransform: "capitalize", maxHeight: "150px"},
							}}
							label="State*"
							//   {...field}
							fullWidth
							//   error={!!error}
							//   helperText={error?.message}
							defaultValue="State"
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									// Class for the border around the input field
									"& .MuiOutlinedInput-notchedOutline": {
										borderWidth: "1px",
										transition: "border-color 0.3s", // Add transition for smooth effect
									},
									"&:hover .MuiOutlinedInput-notchedOutline": {
										borderColor: "#CA7229",
									},
									"&.Mui-focused": {
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "#CA7229",
											borderWidth: "2px",
										},

										"& .MuiInputLabel-outlined": {
											color: "#CA7229",
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									},
								},

								"& .MuiInputLabel-outlined": {
									"&.Mui-focused": {
										color: "#CA7229",
									},
								},
							}}
						>
							{statesUS.map(({postal, name}) => (
								<MenuItem
									key={postal}
									value={name}
									sx={{
										mx: 0.5,
										my: 0.5,
										borderRadius: 0.75,
										typography: "body2",
										textTransform: "capitalize",
									}}
								>
									{name}
								</MenuItem>
							))}
						</TextField>
						{/* <Select
        label="State*"
        fullWidth
        variant="outlined"
        size="small"
        defaultValue="States"
		// onClick={handleGetState}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              transition: "border-color 0.3s",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CA7229",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#CA7229",
                borderWidth: "2px",
              },
              "& .MuiInputLabel-outlined": {
                color: "#CA7229",
                "&.Mui-focused": {
                  color: "#CA7229",
                },
              },
            },
          },
          "& .MuiInputLabel-outlined": {
            "&.Mui-focused": {
              color: "#CA7229",
            },
          },
        }}
      >
        {statesUS.map(({ postal, name }) => (
          <MenuItem key={postal} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select> */}
					</div>

					<div className="w-full mb-4">
						<Controller
							control={control}
							name="landmark"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									label="Landmark*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											// Class for the border around the input field
											"& .MuiOutlinedInput-notchedOutline": {
												borderWidth: "1px",
												transition: "border-color 0.3s", // Add transition for smooth effect
											},
											"&:hover .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
											},
											"&.Mui-focused": {
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "#CA7229",
													borderWidth: "2px",
												},

												"& .MuiInputLabel-outlined": {
													color: "#CA7229",
													"&.Mui-focused": {
														color: "#CA7229",
													},
												},
											},
										},

										"& .MuiInputLabel-outlined": {
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									}}
								/>
							)}
						/>
					</div>

					<div className="w-full mb-4">
						<Controller
							control={control}
							name="zipCode"
							rules={{
								required: {value: true, message: "This field is required!"},
								pattern: {
									value: /^\d{6}$/,
									message: "Zip code must be a six-digit number!",
								},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									type="number"
									label="Zip code*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											// Class for the border around the input field
											"& .MuiOutlinedInput-notchedOutline": {
												borderWidth: "1px",
												transition: "border-color 0.3s", // Add transition for smooth effect
											},
											"&:hover .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
											},
											"&.Mui-focused": {
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "#CA7229",
													borderWidth: "2px",
												},

												"& .MuiInputLabel-outlined": {
													color: "#CA7229",
													"&.Mui-focused": {
														color: "#CA7229",
													},
												},
											},
										},

										"& .MuiInputLabel-outlined": {
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									}}
								/>
							)}
						/>
					</div>

					<div className="w-full mb-4">
						<Controller
							control={control}
							name="country"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									disabled
									label="Country*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"& .MuiOutlinedInput-root": {
											// Class for the border around the input field
											"& .MuiOutlinedInput-notchedOutline": {
												borderWidth: "1px",
												transition: "border-color 0.3s", // Add transition for smooth effect
											},
											"&:hover .MuiOutlinedInput-notchedOutline": {
												borderColor: "#CA7229",
											},
											"&.Mui-focused": {
												"& .MuiOutlinedInput-notchedOutline": {
													borderColor: "#CA7229",
													borderWidth: "2px",
												},

												"& .MuiInputLabel-outlined": {
													color: "#CA7229",
													"&.Mui-focused": {
														color: "#CA7229",
													},
												},
											},
										},

										"& .MuiInputLabel-outlined": {
											"&.Mui-focused": {
												color: "#CA7229",
											},
										},
									}}
								/>
							)}
						/>
					</div>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Interested in Products*:
					</label>
					<div className="grid grid-cols-3 gap-2">
						<FormControlLabel
							label="General"
							control={
								<Controller
									name={"general"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Meat"
							control={
								<Controller
									name={"meat"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Seafood"
							control={
								<Controller
									name={"seafood"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Cooked Food"
							control={
								<Controller
									name={"cookedFood"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Dim Sum"
							control={
								<Controller
									name={"dimSum"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Tofu"
							control={
								<Controller
									name={"tofu"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Roasted Meat"
							control={
								<Controller
									name={"roastedMeat"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>

						<FormControlLabel
							label="Grocery"
							control={
								<Controller
									name={"grocery"}
									control={control}
									render={({field}) => (
										<Checkbox
											{...field}
											checked={field.value}
											sx={{
												color: "#00AA5C",
												"&.Mui-checked": {
													color: "#00AA5C",
												},
											}}
										/>
									)}
								/>
							}
						/>
					</div>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Preferred Products:
					</label>

					{fields.map((field, index) => {
						return (
							<div key={field.id} className="my-4">
								<div className="w-full mb-4">
									<Controller
										control={control}
										name={`products.${index}.preferredProducts`}
										rules={{
											required: {
												value: true,
												message: "This field is required!",
											},
										}}
										render={({field, fieldState: {error}}) => (
											<TextField
												label="Preferred Products*"
												{...field}
												fullWidth
												error={!!error}
												helperText={error?.message}
												size="small"
												InputProps={{
													className: "bg-[#FDF0E1]",
												}}
												sx={{
													"& .MuiOutlinedInput-root": {
														// Class for the border around the input field
														"& .MuiOutlinedInput-notchedOutline": {
															borderWidth: "1px",
															transition: "border-color 0.3s", // Add transition for smooth effect
														},
														"&:hover .MuiOutlinedInput-notchedOutline": {
															borderColor: "#CA7229",
														},
														"&.Mui-focused": {
															"& .MuiOutlinedInput-notchedOutline": {
																borderColor: "#CA7229",
																borderWidth: "2px",
															},

															"& .MuiInputLabel-outlined": {
																color: "#CA7229",
																"&.Mui-focused": {
																	color: "#CA7229",
																},
															},
														},
													},

													"& .MuiInputLabel-outlined": {
														"&.Mui-focused": {
															color: "#CA7229",
														},
													},
												}}
											/>
										)}
									/>
								</div>

								<div className="grid grid-cols-2 gap-2">
									<div className="w-full">
										<Controller
											control={control}
											name={`products.${index}.orderFrequency`}
											rules={{
												required: {
													value: true,
													message: "This field is required!",
												},
											}}
											render={({field, fieldState: {error}}) => (
												<TextField
													select
													InputLabelProps={{shrink: true}}
													SelectProps={{
														native: false,
														sx: {textTransform: "capitalize"},
													}}
													label="Order Frequency*"
													{...field}
													fullWidth
													error={!!error}
													helperText={error?.message}
													size="small"
													InputProps={{
														className: "bg-[#FDF0E1]",
													}}
													sx={{
														"& .MuiOutlinedInput-root": {
															// Class for the border around the input field
															"& .MuiOutlinedInput-notchedOutline": {
																borderWidth: "1px",
																transition: "border-color 0.3s", // Add transition for smooth effect
															},
															"&:hover .MuiOutlinedInput-notchedOutline": {
																borderColor: "#CA7229",
															},
															"&.Mui-focused": {
																"& .MuiOutlinedInput-notchedOutline": {
																	borderColor: "#CA7229",
																	borderWidth: "2px",
																},

																"& .MuiInputLabel-outlined": {
																	color: "#CA7229",
																	"&.Mui-focused": {
																		color: "#CA7229",
																	},
																},
															},
														},

														"& .MuiInputLabel-outlined": {
															"&.Mui-focused": {
																color: "#CA7229",
															},
														},
													}}
												>
													{DUMMY_DROPDOWN.map((option) => (
														<MenuItem
															key={option}
															value={option}
															sx={{
																mx: 1,
																my: 0.5,
																borderRadius: 0.75,
																typography: "body2",
																textTransform: "capitalize",
															}}
														>
															{option}
														</MenuItem>
													))}
												</TextField>
											)}
										/>
									</div>
									<div className="w-full">
										<Controller
											control={control}
											name={`products.${index}.quantity`}
											rules={{
												required: {
													value: true,
													message: "This field is required!",
												},
											}}
											render={({field, fieldState: {error}}) => (
												<TextField
													type="number"
													label="Quantity*"
													{...field}
													fullWidth
													error={!!error}
													helperText={error?.message}
													size="small"
													InputProps={{
														className: "bg-[#FDF0E1]",
													}}
													sx={{
														"& .MuiOutlinedInput-root": {
															// Class for the border around the input field
															"& .MuiOutlinedInput-notchedOutline": {
																borderWidth: "1px",
																transition: "border-color 0.3s", // Add transition for smooth effect
															},
															"&:hover .MuiOutlinedInput-notchedOutline": {
																borderColor: "#CA7229",
															},
															"&.Mui-focused": {
																"& .MuiOutlinedInput-notchedOutline": {
																	borderColor: "#CA7229",
																	borderWidth: "2px",
																},

																"& .MuiInputLabel-outlined": {
																	color: "#CA7229",
																	"&.Mui-focused": {
																		color: "#CA7229",
																	},
																},
															},
														},

														"& .MuiInputLabel-outlined": {
															"&.Mui-focused": {
																color: "#CA7229",
															},
														},
													}}
												/>
											)}
										/>
									</div>
								</div>
								{index < 1 && (
									<>
										<div
											className="flex items-center justify-end gap-1 mt-4 cursor-pointer"
											onClick={() =>
												reset({
													products: [{preferredProducts: "", orderFrequency: "", quantity: ""}],
												})
											}
										>
											<span className="font-semibold">Clear</span>
											<IconButton
												size="small"
												sx={{
													backgroundColor: "#D02F36",
													"&:hover": {
														backgroundColor: "#D02F36",
													},
												}}
											>
												<Trash className="text-white" />
											</IconButton>
										</div>

										<Divider sx={{my: 4}} />
									</>
								)}
								{index >= 1 && (
									<>
										<div
											className="flex items-center justify-end gap-1 mt-4 cursor-pointer"
											onClick={() => remove(index)}
										>
											<span className="font-semibold">Delete</span>
											<IconButton
												size="small"
												sx={{
													backgroundColor: "#D02F36",
													"&:hover": {
														backgroundColor: "#D02F36",
													},
												}}
											>
												<Trash className="text-white" />
											</IconButton>
										</div>

										<Divider sx={{my: 4}} />
									</>
								)}
							</div>
						);
					})}

					<div
						className="flex items-center gap-1 mt-4 cursor-pointer"
						onClick={() =>
							append({
								preferredProducts: "",
								orderFrequency: "",
								quantity: "",
							})
						}
					>
						<IconButton
							size="small"
							sx={{
								backgroundColor: "#00AA5C",
								"&:hover": {
									backgroundColor: "#00AA5C",
								},
							}}
						>
							<Plus className="text-white" />
						</IconButton>{" "}
						<span>Add Products</span>
					</div>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Preferred time to contact**
					</label>

					{/* <FormGroup> */}
					<div>
						<FormControl component="fieldset">
							<Controller
								rules={{
									required: {
										value: selectedTimes.length > 1 ? false : true,
										message: "Make sure at least two checkboxes are checked!",
									},
								}}
								control={control}
								name="preferredTime"
								render={({field}) => (
									<FormGroup {...field}>
										<div className="grid grid-cols-3 gap-6">
											{timeOptions.map((option) => (
												<FormControlLabel
													key={option.value}
													value={option.value}
													control={
														<Checkbox
															{...field}
															value={option.value}
															onChange={() => handleCheckboxChange(option.value)}
														/>
													}
													label={option.label}
													sx={{
														color: "#00AA5C",
														"&.Mui-checked": {
															color: "#00AA5C",
														},
													}}
												/>
											))}
										</div>
									</FormGroup>
								)}
							/>
						</FormControl>
						{/* <FormControlLabel
                label="9:00 AM - 11:00 AM"
                control={
                  <Controller
                    name={"morning1"}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: "#00AA5C",
                          "&.Mui-checked": {
                            color: "#00AA5C",
                          },
                        }}
                      />
                    )}
                  />
                }
              /> */}

						{/* <FormControlLabel
                label="11:00 AM - 1:00 PM"
                control={
                  <Controller
                    name={"morning2"}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: "#00AA5C",
                          "&.Mui-checked": {
                            color: "#00AA5C",
                          },
                        }}
                      />
                    )}
                  />
                }
              /> */}

						{/* <FormControlLabel
                label="1:00 PM - 3:00 PM"
                control={
                  <Controller
                    name={"afternoon1"}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: "#00AA5C",
                          "&.Mui-checked": {
                            color: "#00AA5C",
                          },
                        }}
                      />
                    )}
                  />
                }
              /> */}
						{/* <FormControlLabel
                label="3:00 PM - 5:00 PM"
                control={
                  <Controller
                    name={"afternoon2"}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: "#00AA5C",
                          "&.Mui-checked": {
                            color: "#00AA5C",
                          },
                        }}
                      />
                    )}
                  />
                }
              />
			  <FormControlLabel
                label="5:00 PM - 7:00 PM"
                control={
                  <Controller
                    name={"afternoon3"}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: "#00AA5C",
                          "&.Mui-checked": {
                            color: "#00AA5C",
                          },
                        }}
                      />
                    )}
                  />
                }
              />
			  <FormControlLabel
                label="7:00 PM - 9:00 PM"
                control={
                  <Controller
                    name={"afternoon4"}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: "#00AA5C",
                          "&.Mui-checked": {
                            color: "#00AA5C",
                          },
                        }}
                      />
                    )}
                  />
                }
              /> */}
					</div>
					{/* </FormGroup> */}

					<FormHelperText>**Select at least 2 slots</FormHelperText>
					{errors.preferredTime && (
						<FormHelperText error>{errors.preferredTime.message}</FormHelperText>
					)}
				</div>

				<Button
					type="submit"
					fullWidth
					sx={{
						backgroundColor: "#00AA5C",
						"&:hover": {backgroundColor: "#00AA5C"},
						color: "#fff",
					}}
					disabled={!isValid}
				>
					Submit
				</Button>
			</form>
		</FormProvider>
	);
};

export default Home;
