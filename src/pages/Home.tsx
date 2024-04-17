import {useId} from "react";
import {Controller, FormProvider, useFieldArray, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {FormProp} from "../types/form.type";
import {
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	IconButton,
	MenuItem,
	TextField,
} from "@mui/material";
import {Plus, Trash} from "lucide-react";

const DUMMY_DROPDOWN = ["Weekly", "Semi - Monthly", "Monthly", "Quarterly"];

// const options = [
// 	{label: "9:00 AM - 11:00 AM", value: "morning1"},
// 	{label: "11:00 AM - 1:00 PM", value: "morning2"},
// 	{label: "1:00 PM - 3:00 PM", value: "afternoon1"},
// 	{label: "3:00 PM - 5:00 PM", value: "afternoon2"},
// 	{label: "5:00 PM - 7:00 PM", value: "evening1"},
// 	{label: "7:00 PM - 9:00 PM", value: "evening2"},
// ];

const Home = () => {
	const navigate = useNavigate();
	const formId = useId();
	const methods = useForm<FormProp>({
		mode: "onBlur",
		defaultValues: {
			companyName: "",
			contactPerson: "",
			phone: "",
			zipCode: "",
			city: "",
			state: "",
			country: "INDIA",
			email: "",
			address1: "",
			address2: "",
			landmark: "",
			products: [{preferredProducts: "", orderFrequency: "", quantity: ""}],
			restaurant: false,
			supermarket: false,
			others: false,
			anyOtherText: "",
			cookedFood: false,
			dimSum: false,
			general: false,
			grocery: false,
			meat: false,
			roastedMeat: false,
			seafood: false,
			tofu: false,

			morning1: false,
			morning2: false,
			afternoon1: false,
			afternoon2: false,
			evening1: false,
			evening2: false,
		},
	});

	const {
		handleSubmit,
		control,
		formState: {isValid},
		watch,
		reset,
	} = methods;

	const values = watch();

	const {append, remove, fields} = useFieldArray({name: "products", control});

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
		others,
		restaurant,
		supermarket,
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
		morning1,
		morning2,
		afternoon1,
		afternoon2,
		evening1,
		evening2,
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
			others,
			restaurant,
			supermarket,
			anyOtherText,
			cookedFood,
			dimSum,
			general,
			grocery,
			meat,
			roastedMeat,
			seafood,
			tofu,
			morning1,
			morning2,
			afternoon1,
			afternoon2,
			evening1,
			evening2,
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
											"& .MuiOutlinedInput-notchedOutline:hover": {
												borderColor: "#CA7229",
												borderWidth: "1px",
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
										"&:hover": {
											borderColor: "#CA7229",
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
						<FormControlLabel
							label="Restaurant"
							control={
								<Controller
									name={"restaurant"}
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
							label="Supermarket"
							control={
								<Controller
									name={"supermarket"}
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
							label="Others"
							control={
								<Controller
									name={"others"}
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

				{/* <TEXTBOX> OTHER BUSINESS TYPE */}
				<div className="w-full mb-4">
					<Controller
						control={control}
						name="contactPerson"
						rules={{
							required: {value: true, message: "This field is required!"},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								disabled={!values.others}
								className="disabled:cursor-not-allowed"
								label="Any other business type"
								{...field}
								fullWidth
								error={!!error}
								helperText={error?.message}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								sx={{
									color: "#CA7229",
									"&:hover": {
										borderColor: "#CA7229",
									},

									".Mui-focused": {
										borderColor: "#CA7229",
									},

									"&.Mui-disabled": {
										cursor: "not-allowed",
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
								}}
								sx={{
									"&:hover": {
										borderColor: "#CA7229",
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
									"&:hover": {
										borderColor: "#CA7229",
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
									"&:hover": {
										borderColor: "#CA7229",
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
									"&:hover": {
										borderColor: "#CA7229",
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
										"&:hover": {
											borderColor: "#CA7229",
										},
									}}
								/>
							)}
						/>
					</div>

					<div className="w-full mb-4">
						<Controller
							control={control}
							name="state"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							render={({field, fieldState: {error}}) => (
								<TextField
									label="State*"
									{...field}
									fullWidth
									error={!!error}
									helperText={error?.message}
									size="small"
									InputProps={{
										className: "bg-[#FDF0E1]",
									}}
									sx={{
										"&:hover": {
											borderColor: "#CA7229",
										},
									}}
								/>
							)}
						/>
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
										"&:hover": {
											borderColor: "#CA7229",
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
										"&:hover": {
											borderColor: "#CA7229",
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
										"&:hover": {
											borderColor: "#CA7229",
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
											required: {value: true, message: "This field is required!"},
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
													"&:hover": {
														borderColor: "#CA7229",
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
												required: {value: true, message: "This field is required!"},
											}}
											render={({field, fieldState: {error}}) => (
												<TextField
													select
													InputLabelProps={{shrink: true}}
													SelectProps={{native: false, sx: {textTransform: "capitalize"}}}
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
														"&:hover": {
															borderColor: "#CA7229",
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
												required: {value: true, message: "This field is required!"},
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
														"&:hover": {
															borderColor: "#CA7229",
														},
													}}
												/>
											)}
										/>
									</div>
								</div>

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
						onClick={() => append({preferredProducts: "", orderFrequency: "", quantity: ""})}
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
					<FormGroup>
						<div className="grid grid-cols-3 gap-2">
							<FormControlLabel
								label="9:00 AM - 11:00 AM"
								control={
									<Controller
										name={"morning1"}
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
								label="11:00 AM - 1:00 PM"
								control={
									<Controller
										name={"morning2"}
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
								label="1:00 PM - 3:00 PM"
								control={
									<Controller
										name={"afternoon1"}
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
					</FormGroup>

					<FormHelperText>**Select at least 2 slots</FormHelperText>
				</div>

				<Button
					type="submit"
					fullWidth
					sx={{backgroundColor: "#00AA5C", "&:hover": {backgroundColor: "#00AA5C"}, color: "#fff"}}
					disabled={!isValid}
				>
					Submit
				</Button>
			</form>
		</FormProvider>
	);
};

export default Home;
