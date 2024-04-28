import {useId, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	FormHelperText,
	IconButton,
	InputAdornment,
	MenuItem,
	Typography,
} from "@mui/material";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {Plus, Trash} from "lucide-react";
import {CustomerOnboardingFormData} from "../../types/form.type";
import usFlag from "/usflag.jpg";
import states from "../../components/us.json";
import {
	DEFAULT_VALUES,
	DELIVERY_OPTIONS,
	PAY_TERM,
	PAY_TYPE,
	PRODUCT_CATEGORY,
	TIME_OPTIONS,
	TYPE_OPTIONS,
} from "../../shared/utils/mock";
import RHFTextField from "../../components/hooks-form/RHFTextField";
import RHFSelect from "../../components/hooks-form/RHFSelect";
import {RHFCheckbox, RHFMultiCheckbox} from "../../components/hooks-form/RHFCheckbox";
import RHFRadioGroup from "../../components/hooks-form/RHFRadioGroup";

const Home = () => {
	const [statesUS] = useState(states);
	const navigate = useNavigate();
	const formId = useId();
	const methods = useForm<CustomerOnboardingFormData>({
		mode: "all",
		defaultValues: DEFAULT_VALUES,
	});

	const {
		handleSubmit,
		control,
		formState: {isValid, errors},
		reset,
	} = methods;

	// useEffect(() => {
	// 	if (values.business !== "Others") {
	// 		clearErrors("anyOtherText");
	// 	}
	// }, [clearErrors, values.business]);

	const {append, remove, fields} = useFieldArray({
		name: "products",
		control,
	});

	const handleOnSubmit: SubmitHandler<CustomerOnboardingFormData> = async ({
		addressLine1,
		addressLine2,
		businessType,
		city,
		comment,
		companyName,
		contactName,
		country,
		email,
		interestedProductCategories,
		isAlsoBillingAddress,
		payTerm,
		payType,
		phone,
		products,
		state,
		turnOverPerAnnum,
		zipCode,
	}) => {
		const productDetails = {
			id: formId.slice(0, 3),
			shippingAddress: {
				addressLine1,
				addressLine2,
				city,
				zipCode,
				state,
			},
			isAlsoBillingAddress,
			businessType,
			comment,
			companyName,
			contactName,
			country,
			email,
			interestedProductCategories,
			payTerm,
			payType,
			phone,
			preferredTimeSlots: selectedTimes,
			products,
			turnOverPerAnnum,
		};

		const itemsInCompare = JSON.parse(localStorage.getItem("itemsInCompare") || "[]");

		itemsInCompare.push(productDetails);

		localStorage.setItem("itemsInCompare", JSON.stringify(itemsInCompare));
		navigate("/thankyou");
		reset();
	};

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  
	const handleCheckboxChange = (option: string) => {
		if (selectedTimes.includes(option)) {
			setSelectedTimes(selectedTimes.filter((time) => time !== option));
		} else {
			setSelectedTimes([...selectedTimes, option]);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(handleOnSubmit)} className="max-w-screen-md mx-auto p-4">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="companyName"
							label="Company Name*"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
						/>
					</Box>
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="contactName"
							label="Contact Person*"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
						/>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFSelect
							fullWidth
							name="businessType"
							label="Business Type*"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							InputLabelProps={{shrink: true}}
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							SelectProps={{
								native: false,
								sx: {textTransform: "capitalize"},
							}}
						>
							{TYPE_OPTIONS.map((option) => (
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
						</RHFSelect>
					</Box>

					{/* {values.businessType == "Others" && (
						<Box sx={{width: "100%"}}>
							<RHFTextField
								name="anyOtherText"
								label="Any other business type*"
								size="small"
								rules={{
									required: {
										value: values.businessType === "Others",
										message: "This field is required!",
									},
								}}
								disabled={values.businessType !== "Others"}
								InputProps={{
									className: `${values.businessType !== "Others" ? "bg-black" : "bg-[#FDF0E1]"}`,
								}}
							/>
						</Box>
					)} */}
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="phone"
							label="Phone number*"
							type="number"
							rules={{
								required: {value: true, message: "This field is required!"},
								pattern: {
									value: /^[2-9]\d{2}\d{3}\d{4}$/,
									message: "Invalid US phone number format! (e.g., XXX-XXX-XXXX)",
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
								startAdornment: (
									<InputAdornment position="start">
										<div className="flex items-center gap-2">
											<img src={usFlag} className="h-4" /> +1
										</div>
										<div className="px-4">
											<Divider orientation="vertical" flexItem sx={{backgroundColor: "gray"}} />
										</div>
									</InputAdornment>
								),
							}}
						/>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="email"
							type="email"
							label="Email Address*"
							rules={{
								required: {value: true, message: "This field is required!"},
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Invalid email address!",
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
						/>
					</Box>
				</div>

				<Typography
					variant="subtitle2"
					sx={{
						mb: "2em",
						color: "#9E4900",
						fontWeight: "500",
						fontSize: "16px",
					}}
				>
					Shipping Address
				</Typography>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="addressLine1"
							label="Address Line 1*"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
						/>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="addressLine2"
							label="Address Line 2*"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
						/>
					</Box>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFTextField
								name="zipCode"
								label="ZipCode*"
								rules={{
									required: {value: true, message: "This field is required!"},
									pattern: {
										value: /^\d{6}$/,
										message: "Zip code must be a six-digit number!",
									},
								}}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
							/>
						</Box>
					</div>
					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFTextField
								name="city"
								label="City*"
								rules={{
									required: {value: true, message: "This field is required!"},
								}}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
							/>
						</Box>
					</div>

					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFSelect
								fullWidth
								name="state"
								label="State*"
								rules={{
									required: {value: true, message: "This field is required!"},
								}}
								InputLabelProps={{shrink: true}}
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								SelectProps={{
									native: false,
									sx: {textTransform: "capitalize"},
								}}
							>
								{statesUS.map(({abbreviation, name}) => (
									<MenuItem
										key={abbreviation}
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
							</RHFSelect>
						</Box>
					</div>

					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFTextField
								name="country"
								label="Country"
								rules={{
									required: {value: true, message: "This field is required!"},
								}}
								disabled
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
							/>
						</Box>
					</div>
				</div>
				<div className="w-full mb-4">
					<RHFCheckbox label="Use it as my Billing Address" name="isAlSoBillingAddress" />
				</div>
				<Typography
					variant="subtitle2"
					sx={{
						mb: "2em",
						color: "#9E4900",
						fontWeight: "600",
						fontSize: "16px",
					}}
				>
					Payment Information
				</Typography>
				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Pay Term*:
					</label>
					{/* TODO: rules is pending */}
					<RHFRadioGroup
						rules={{
							required: {value: true, message: "This field is required!"},
						}}
						name="payTerm"
						options={PAY_TERM}
					/>
				</div>
				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Pay Type*:
					</label>
					<RHFRadioGroup
						rules={{
							required: {value: true, message: "This field is required!"},
						}}
						name="payType"
						options={PAY_TYPE}
					/>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="turnOverPerAnnum"
							label="Company's Turnover (per annum)"
							type="number"
							rules={{
								required: {value: true, message: "This field is required!"},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
								startAdornment: (
									<InputAdornment position="start">
										<div>
											<Typography variant="body1" sx={{color: "black"}}>
												$
											</Typography>
										</div>
									</InputAdornment>
								),
							}}
						/>
					</Box>
				</div>
				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Interested product category*:
					</label>
					<RHFMultiCheckbox
						rules={{
							required: {value: true, message: "This field is required!"},
						}}
						name="interestedProductCategories"
						options={PRODUCT_CATEGORY}
					/>
					{errors.interestedProductCategories && (
						<FormHelperText error>{errors.interestedProductCategories.message}</FormHelperText>
					)}
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Preferred Products:
					</label>
					<Box
						className="customScrollbar"
						sx={{overflowY: "auto", height: "auto", maxHeight: "450px", p: 1}}
					>
						{fields.map((field, index) => {
							return (
								<div key={field.id} className="my-4">
									<div className="w-full mb-4">
										<RHFTextField
											rules={{
												required: {
													value: true,
													message: "This field is required!",
												},
											}}
											size="small"
											name={`products.${index}.productName`}
											InputProps={{
												className: "bg-[#FDF0E1]",
											}}
											label="Preferred Products*"
										/>
									</div>

									<div className="grid grid-cols-2 gap-2">
										<div className="w-full">
											<RHFSelect
												fullWidth
												name={`products.${index}.orderFrequency`}
												label="Order Frequency*"
												rules={{
													required: {
														value: true,
														message: "This field is required!",
													},
												}}
												InputLabelProps={{shrink: true}}
												InputProps={{
													className: "bg-[#FDF0E1]",
												}}
												SelectProps={{
													native: false,
													sx: {textTransform: "capitalize"},
												}}
											>
												{PAY_TERM.map((option) => (
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
											</RHFSelect>
										</div>
										<div className="w-full">
											<RHFTextField
												rules={{
													required: {
														value: true,
														message: "This field is required!",
													},
												}}
												size="small"
												name={`products.${index}.quantity`}
												InputProps={{
													className: "bg-[#FDF0E1]",
												}}
												label="Quantity"
												type="number"
											/>
										</div>
									</div>
									{index < 1 && (
										<>
											<div
												className="flex items-center justify-end gap-1 mt-4 cursor-pointer"
												onClick={() =>
													reset({
														products: [
															{
																productName: "",
																orderFrequency: "",
																quantity: "",
															},
														],
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
											<div className="flex items-center justify-end gap-1 mt-4">
												<span className="font-semibold">Delete</span>
												<IconButton
													size="small"
													sx={{
														backgroundColor: "#D02F36",
														"&:hover": {
															backgroundColor: "#D02F36",
														},
														cursor: "pointer",
													}}
													onClick={() => remove(index)}
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
					</Box>
					<div className="flex items-center gap-1 mt-4">
						<IconButton
							size="small"
							sx={{
								cursor: "pointer",
								backgroundColor: "#00AA5C",
								"&:hover": {
									backgroundColor: "#00AA5C",
								},
							}}
							onClick={() =>
								append({
									productName: "",
									orderFrequency: "",
									quantity: "",
								})
							}
						>
							<Plus className="text-white" />
						</IconButton>{" "}
						<span>Add Products</span>
					</div>
				</div>

				<div className="w-full mb-4">
					<RHFSelect
						fullWidth
						name={`deliveryOption`}
						label="Delivery Options*"
						rules={{
							required: {
								value: true,
								message: "This field is required!",
							},
						}}
						InputLabelProps={{shrink: true}}
						InputProps={{
							className: "bg-[#FDF0E1]",
						}}
						SelectProps={{
							native: false,
							sx: {textTransform: "capitalize"},
						}}
					>
						{DELIVERY_OPTIONS.map((option) => (
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
					</RHFSelect>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						Preferred time to contact*
					</label>
					<div>
						{/* TODO: Time validation pending */}
						<RHFMultiCheckbox
							rules={{
								required: {
									value: selectedTimes && selectedTimes.length > 2 ? false : true,
									message: "Make sure at least two checkboxes are checked!",
								},
							}}
							options={TIME_OPTIONS}
							handleChange={(option) => handleCheckboxChange(option)}
							name="preferredTimeSlots"
						/>
					</div>

					<FormHelperText>**Select at least 2 slots</FormHelperText>
					{errors.preferredTimeSlots && (
						<FormHelperText error>{errors.preferredTimeSlots.message}</FormHelperText>
					)}
				</div>

				<Box sx={{display: "flex", justifyContent: "end", zIndex: -1}}>
					<Button
						type="submit"
						sx={{
							backgroundColor: "#00AA5C",
							"&:hover": {backgroundColor: "#00AA5C"},
							color: "#fff",
							alignItems: "right",
							"@media (max-width: 600px)": {
								width: "40%",
								borderRadius: "30px",
							},
							width: "40%",
							borderRadius: "30px",
							"&.Mui-disabled": {
								backgroundColor: "grey",
								color: "#ccc",
								cursor: "not-allowed",
							},
							"&:disabled": {
								cursor: "not-allowed",
							},
						}}
						disabled={!isValid}
					>
						Submit
					</Button>
				</Box>
			</form>
		</FormProvider>
	);
};

export default Home;
