import {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputBaseComponentProps,
	ListItemText,
	MenuItem,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import {Controller, FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {Plus, Trash} from "lucide-react";
import {CustomerOnboardingFormData} from "../../types/form.type";
import {
	DELIVERY_OPTIONS,
	PAY_TERM,
	PAY_TYPE,
	PRODUCT_CATEGORY,
	BUSINESS_TYPE,
	TIME_OPTIONS,
	DEFAULT_VALUES,
} from "../../shared/utils/mock";
import RHFTextField, {TextMaskCustom} from "../../components/hooks-form/RHFTextField";
import RHFSelect from "../../components/hooks-form/RHFSelect";
import {RHFCheckbox, RHFMultiCheckbox} from "../../components/hooks-form/RHFCheckbox";
import RHFRadioGroup from "../../components/hooks-form/RHFRadioGroup";
import {TimeZones} from "../../shared/enums/time-zones";
import ProductQuantityUnits from "../../shared/enums/product-quantity-units";
import CompanyTurnOver from "../../shared/enums/company-turnover";
import statesUS from "../../components/us.json";
import {useTranslation} from "react-i18next";

const Home = () => {
	const {t} = useTranslation();

	const navigate = useNavigate();
	const methods = useForm<CustomerOnboardingFormData>({
		mode: "all",
		defaultValues: DEFAULT_VALUES,
	});

	const {
		handleSubmit,
		control,
		formState: {isValid, isLoading, errors},
		reset,
		watch,
		setValue,
	} = methods;

	const values = watch();

	console.log(values.isAlsoBillingAddress);

	const {append, remove, fields} = useFieldArray({
		name: "products",
		control,
	});

	const handleBusinessTypeChange = (event: SelectChangeEvent<typeof values.businessType>) => {
		const {
			target: {value},
		} = event;

		setValue("businessType", typeof value === "string" ? value.split(",") : value);
	};

	const handleInterestedProductCategoriesChange = (
		event: SelectChangeEvent<typeof values.interestedProductCategories>
	) => {
		const {
			target: {value},
		} = event;

		setValue("interestedProductCategories", typeof value === "string" ? value.split(",") : value);
	};

	const handleOnSubmit: SubmitHandler<CustomerOnboardingFormData> = async ({
		addressLine1,
		addressLine2,
		businessType,
		city,
		comment,
		companyName,
		contactName,
		deliveryOption,
		email,
		interestedProductCategories,
		isAlsoBillingAddress,
		payTerm,
		payType,
		phone,
		products,
		preferredTimeSlots,
		preferredTimeZone,
		state,
		turnOverPerAnnum,
		zipCode,
	}) => {
		const productDetails = {
			shippingAddress: {
				line1: addressLine1,
				line2: addressLine2,
				city,
				zipCode,
				state,
			},
			shouldUseShippingAsBillingAddress: isAlsoBillingAddress,
			businessType,
			comments: [{value: comment}],
			companyName,
			contactName,
			email,
			interestedProductCategories,
			paymentTerm: payTerm,
			paymentType: payType,
			phoneNumber: phone,
			preferredTimeSlots: preferredTimeSlots,
			preferredTimeZone,
			preferredProducts: products,
			turnOverPerAnnum,
			deliveryOption,
		};

		//${import.meta.env.VITE_SERVER_API}
		const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/customers`, {
			// const response = await fetch(`https://wayfongonline.com/console/api/customers`, {
			method: "POST",
			body: JSON.stringify(productDetails),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});

		navigate("/thankyou", {state: {status: response.status}});
		reset();
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(handleOnSubmit)} className="max-w-screen-md mx-auto p-4">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name={"companyName"}
							label={t("Company Name")}
							required
							rules={{
								required: {value: true, message: t("This field is required!")},
								pattern: {
									value: /^[a-zA-Z\s]*$/,
									message: t("Please enter only letters and spaces."),
								},
								minLength: {
									value: 6,
									message: "minimum character should at least be 6",
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							inputProps={{maxLength: 27}}
						/>
					</Box>

					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="contactName"
							label={t("Contact Person")}
							required
							rules={{
								required: {value: true, message: t("This field is required!")},
								pattern: {
									value: /^[a-zA-Z\s]*$/,
									message: t("Please enter only letters and spaces."),
								},
								minLength: {
									value: 6,
									message: "minimum character should at least be 6",
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							inputProps={{maxLength: 27}}
						/>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFSelect
							fullWidth
							name="businessType"
							label={t("Business Type")}
							required
							rules={{
								required: {value: true, message: t("This field is required!")},
							}}
							InputLabelProps={{shrink: true}}
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							SelectProps={{
								native: false,
								sx: {textTransform: "capitalize"},
								multiple: true,
								renderValue: (selected: unknown) => (selected as string[]).join(", "),
								value: values.businessType ?? ([] as string[]),
								onChange: (e: SelectChangeEvent<unknown>) =>
									handleBusinessTypeChange(e as SelectChangeEvent<string[]>),
							}}
						>
							{BUSINESS_TYPE.map((option) => (
								<MenuItem
									key={option}
									value={option}
									sx={{
										mx: 1,
										my: 0.5,
										borderRadius: 0.75,
										typography: "body2",
										textTransform: "capitalize",
										bgcolor: "",
										"&.MuiMenuItem-root": {
											"&.Mui-selected": {
												backgroundColor: "rgba(12, 133, 9, 0.1)",
											},
										},
									}}
								>
									<Checkbox
										sx={{
											color: "#00AA5C",
											"&.Mui-checked": {
												color: "#00AA5C",
											},
										}}
										checked={values?.businessType?.indexOf(option) > -1}
									/>
									<ListItemText primary={t(option)} sx={{p: 0.5}} />
								</MenuItem>
							))}
						</RHFSelect>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<Box sx={{height: "3.5em", maxHeight: "3.5em"}}>
							<Controller
								name="phone"
								control={control}
								rules={{
									required: {value: true, message: t("This field is required!")},
									pattern: {
										value: /^\d{3}-\d{3}-\d{4}$/,
										message: t("Invalid USA phone number"),
									},
								}}
								render={({field}) => {
									return (
										<TextField
											fullWidth
											label={t("Phone Number")}
											required
											InputProps={{
												inputComponent:
													TextMaskCustom as unknown as FunctionComponent<InputBaseComponentProps>,
												className: "bg-[#FDF0E1]",
												startAdornment: (
													<InputAdornment position="start">
														<div className="flex items-center gap-2">
															{/* <img src={usFlag} className="h-4" /> */}
															+1
														</div>
														<div className="">
															<Divider
																orientation="vertical"
																flexItem
																sx={{backgroundColor: "gray"}}
															/>
														</div>
													</InputAdornment>
												),
											}}
											id="formatted-text-mask-input"
											size="small"
											error={!!errors.phone}
											helperText={!!errors.phone && errors.phone.message}
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
											{...field}
										/>
									);
								}}
							/>
						</Box>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="email"
							type="email"
							label={t("Email Address")}
							required
							rules={{
								required: {value: true, message: t("This field is required!")},
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: t("Invalid email address!"),
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							inputProps={{maxLength: 320}}
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
					{t("Shipping Address")}{" "}
					<Box component="span" color="red">
						*
					</Box>
				</Typography>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="addressLine1"
							label={t("Address line 1")}
							required
							rules={{
								required: {value: true, message: t("This field is required!")},
								pattern: {
									value: /^[a-zA-Z0-9,#\\/\s]+$/,
									message: t("Only numbers, letters, spaces, comma, slash and ash are allowed."),
								},
								maxLength: {
									value: 40,
									message: "You have reached your limit on the maximum characters",
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							inputProps={{maxLength: 30}}
						/>
					</Box>
				</div>

				<div className="w-full mb-4">
					<Box sx={{width: "100%"}}>
						<RHFTextField
							name="addressLine2"
							label={t("Address line 2")}
							rules={{
								pattern: {
									value: /^[a-zA-Z0-9,#\\/\s]+$/,
									message: t("Only numbers, letters, spaces, comma, slash and ash are allowed."),
								},
								maxLength: {
									value: 40,
									message: "You have reached your limit on the maximum characters",
								},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							inputProps={{maxLength: 30}}
						/>
					</Box>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFTextField
								name="zipCode"
								label={t("Zip Code")}
								type="number"
								required
								rules={{
									required: {value: true, message: t("This field is required!")},
									pattern: {
										value: /^\d{5}$/,
										message: "Zip code must be a 5 digit number!",
									},
								}}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								onInput={(e) =>
									((e.target as HTMLInputElement).value = Math.max(
										0,
										parseInt((e.target as HTMLInputElement).value)
									)
										.toString()
										.slice(0, 5))
								}
							/>
						</Box>
					</div>

					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFTextField
								name="city"
								label={t("City")}
								required
								rules={{
									required: {value: true, message: t("This field is required!")},
								}}
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								inputProps={{maxLength: 28}}
							/>
						</Box>
					</div>

					<div className="w-full mb-4">
						<Box sx={{width: "100%"}}>
							<RHFSelect
								fullWidth
								name="state"
								label={t("State")}
								required
								rules={{
									required: {value: true, message: t("This field is required!")},
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
								label={t("Country")}
								required
								rules={{
									required: {value: true, message: t("This field is required!")},
								}}
								disabled
								size="small"
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
								inputProps={{maxLength: 3}}
							/>
						</Box>
					</div>
				</div>

				<div className="w-full mb-4">
					<RHFCheckbox label={t("Use it as my Billing Address")} name="isAlsoBillingAddress" />
				</div>

				<div className="w-full mb-4">
					<Typography
						variant="subtitle2"
						sx={{
							mb: "1rem",
							color: "#9E4900",
							fontWeight: "600",
							fontSize: "16px",
						}}
					>
						{t("Payment Information")}
					</Typography>
					<label htmlFor="" className="font-semibold">
						{t("Pay Term")}{" "}
						<Box component="span" color="red">
							*
						</Box>
						:
					</label>
					{/* TODO: rules is pending */}
					<RHFRadioGroup
						rules={{
							required: {value: true, message: t("This field is required!")},
						}}
						name="payTerm"
						options={PAY_TERM}
					/>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						{t("Pay Type")}{" "}
						<Box component="span" color="red">
							*
						</Box>
						:
					</label>
					<RHFRadioGroup
						rules={{
							required: {value: true, message: t("This field is required!")},
						}}
						name="payType"
						options={PAY_TYPE}
					/>
				</div>

				<div className="w-full mb-4">
					<Typography
						variant="subtitle2"
						sx={{
							mb: "14px",
							color: "#9E4900",
							fontWeight: "600",
							fontSize: "16px",
						}}
					>
						{t("Company's Turnover (per annum)")} <span className="text-red-600">*</span>
					</Typography>

					<Box sx={{width: "100%"}}>
						<RHFSelect
							name="turnOverPerAnnum"
							label={t("Company's Turnover (per annum)")}
							type="number"
							rules={{
								required: {value: true, message: t("This field is required!")},
							}}
							size="small"
							InputProps={{
								className: "bg-[#FDF0E1]",
								size: "small",
							}}
							SelectProps={{
								native: false,
								sx: {textTransform: "capitalize"},
								size: "small",
							}}
						>
							{Object.values(CompanyTurnOver).map((option) => (
								<MenuItem
									key={option}
									value={option}
									sx={{
										textTransform: "capitalize",
										bgcolor: "",
										"&.MuiMenuItem-root": {
											"&.Mui-selected": {
												backgroundColor: "rgba(12, 133, 9, 0.1)",
											},
										},
									}}
								>
									<ListItemText primary={option} />
								</MenuItem>
							))}
						</RHFSelect>
					</Box>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold block mb-4">
						<Typography
							variant="subtitle2"
							sx={{
								mb: "14px",
								color: "#9E4900",
								fontWeight: "600",
								fontSize: "16px",
							}}
						>
							{t("Interested product Category")} <span className="text-red-600">*</span>
						</Typography>
					</label>
					<Box sx={{width: "100%"}}>
						<RHFSelect
							fullWidth
							name="interestedProductCategories"
							label={t("Interested product Category")}
							required
							rules={{
								required: {value: true, message: t("This field is required!")},
							}}
							InputLabelProps={{shrink: true}}
							InputProps={{
								className: "bg-[#FDF0E1]",
							}}
							SelectProps={{
								native: false,
								sx: {textTransform: "capitalize"},
								multiple: true,
								renderValue: (selected: unknown) => (selected as string[]).join(", "),
								value: values.interestedProductCategories ?? ([] as string[]),
								onChange: (e: SelectChangeEvent<unknown>) =>
									handleInterestedProductCategoriesChange(e as SelectChangeEvent<string[]>),
							}}
						>
							{PRODUCT_CATEGORY.map((option) => (
								<MenuItem
									key={option}
									value={option}
									sx={{
										mx: 1,
										my: 0.5,
										borderRadius: 0.75,
										typography: "body2",
										textTransform: "capitalize",
										bgcolor: "",
										"&.MuiMenuItem-root": {
											"&.Mui-selected": {
												backgroundColor: "rgba(12, 133, 9, 0.1)",
											},
										},
									}}
								>
									<Checkbox
										sx={{
											color: "#00AA5C",
											"&.Mui-checked": {
												color: "#00AA5C",
											},
										}}
										checked={values?.interestedProductCategories?.indexOf(option) > -1}
									/>
									<ListItemText primary={option} sx={{p: 0.5}} />
								</MenuItem>
							))}
						</RHFSelect>
					</Box>
				</div>

				<div className="w-full mb-8">
					<label htmlFor="" className="font-semibold">
						<Typography
							variant="subtitle2"
							sx={{
								mb: "14px",
								color: "#9E4900",
								fontWeight: "600",
								fontSize: "16px",
							}}
						>
							{t("Preferred Products")} <span className="text-red-600">*</span>
						</Typography>
					</label>
					<Box>
						{fields.map((field, index) => {
							return (
								<div key={field.id} className="mt-4">
									<div className="w-full mb-4">
										<RHFTextField
											rules={{
												required: {
													value: true,
													message: t("This field is required!"),
												},
												pattern: {
													value: /^[a-zA-Z\s]*$/,
													message: t("Please enter only letters and spaces."),
												},
											}}
											required
											size="small"
											name={`products.${index}.productName`}
											InputProps={{
												className: "bg-[#FDF0E1]",
											}}
											label={t("Preferred Product")}
											inputProps={{maxLength: 30}}
										/>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
										<div className="w-full">
											<RHFSelect
												fullWidth
												name={`products.${index}.orderFrequency`}
												label={t("Order Frequency")}
												required
												rules={{
													required: {
														value: true,
														message: t("This field is required!"),
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
														message: t("This field is required!"),
													},
													pattern: {
														value: /^[a-zA-Z\s]*$/,
														message: t("Please enter only letters and spaces."),
													},
												}}
												size="small"
												name={`products.${index}.quantity`}
												InputProps={{
													className: "bg-[#FDF0E1]",
												}}
												label={t("Quantity")}
												type="number"
												required
												onInput={(e) =>
													((e.target as HTMLInputElement).value = Math.max(
														0,
														parseInt((e.target as HTMLInputElement).value)
													)
														.toString()
														.slice(0, 5))
												}
											/>
										</div>
										<div className="w-full">
											<RHFSelect
												fullWidth
												name={`products.${index}.quantityUnit`}
												label={t("Quantity Unit")}
												rules={{
													required: {
														value: true,
														message: t("This field is required!"),
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
												required
											>
												{Object.values(ProductQuantityUnits).map((option) => (
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
									</div>

									{fields?.length > 2 && (
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

											{/* <Divider sx={{my: 2}} /> */}
										</>
									)}

									{index >= 0 && <Divider sx={{my: 2}} />}
								</div>
							);
						})}
					</Box>

					<div className="flex items-center gap-1">
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
									quantity: 1,
									quantityUnit: "lbs",
								})
							}
						>
							<Plus className="text-white" />
						</IconButton>{" "}
						<span>{t("Add Product")}</span>
					</div>
				</div>

				<div className="w-full mb-4">
					<RHFSelect
						fullWidth
						name={`deliveryOption`}
						label={t("Delivery Options")}
						required
						rules={{
							required: {
								value: true,
								message: t("This field is required!"),
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
						<Typography
							variant="subtitle2"
							sx={{
								mb: "14px",
								color: "#9E4900",
								fontWeight: "600",
								fontSize: "16px",
							}}
						>
							{t("Preferred time to contact")} <span className="text-red-600">**</span>
						</Typography>
					</label>
					<div className="w-1/2 my-4">
						<Box sx={{width: "100%"}}>
							<RHFSelect
								fullWidth
								name="preferredTimeZone"
								label={t("Preferred Time Zone")}
								required
								rules={{
									required: {value: true, message: t("This field is required!")},
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
								{Object.values(TimeZones).map((timeZone, index) => (
									<MenuItem
										key={`time-zone-${index}`}
										value={timeZone}
										sx={{
											mx: 0.5,
											my: 0.5,
											borderRadius: 0.75,
											typography: "body2",
											textTransform: "capitalize",
										}}
									>
										{timeZone}
									</MenuItem>
								))}
							</RHFSelect>
						</Box>
					</div>
					<div>
						{/* TODO: Time validation pending */}
						<RHFMultiCheckbox
							rules={{
								required: {
									value: true,
									message: t("This field is required!"),
								},
								// validate: (options: string[]) => {
								// 	if (options && options.length < 3) {
								// 		setError("preferredTimeSlots", {
								// 			message: "Make sure at least two time slots are checked!",
								// 			type: "onChange",
								// 		});
								// 	}
								// },
							}}
							options={TIME_OPTIONS}
							name="preferredTimeSlots"
						/>
					</div>

					<FormHelperText>{t("**Select at least 2 slots")}</FormHelperText>
				</div>

				<div className="w-full mb-4">
					<label htmlFor="" className="font-semibold">
						{t("Comment")}
					</label>

					<Controller
						name={"comment"}
						control={control}
						rules={{
							required: {
								value: true,
								message: t("This field is required!"),
							},
							pattern: {
								value: /^[a-zA-Z\s]*$/,
								message: t("Please enter only letters and spaces."),
							},
							minLength: {
								value: 10,
								message: "minimum character should at least be 10",
							},
						}}
						render={({field, fieldState: {error}}) => (
							<TextField
								fullWidth
								error={!!error}
								multiline
								rows={4}
								helperText={error?.message}
								InputProps={{
									className: "bg-[#FDF0E1]",
								}}
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
								inputProps={{maxLength: 320}}
								{...field}
							/>
						)}
					/>
				</div>

				<div className="flex justify-end">
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
						disabled={!isValid || values.preferredTimeSlots.length < 2 || isLoading}
					>
						{t("Submit")}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default Home;
