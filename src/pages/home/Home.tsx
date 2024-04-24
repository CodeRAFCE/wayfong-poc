import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import { FormProp } from "../../types/form.type";
import states from "../../components/us.json";
import usflag from "/usflag.jpg";
import RHFTextField from "../../components/hooks-form/RHFTextField";
import RHFSelect from "../../components/hooks-form/RHFSelect";
import {
  RHFCheckbox,
  RHFMultiCheckbox,
} from "../../components/hooks-form/RHFCheckbox";
import {
  DEFAULT_VALUES,
  PAY_TERM,
  PAY_TYPE,
  PRODUCT_CATEGORY,
  TIME_OPTIONS,
  TYPE_OPTIONS,
} from "../../shared/utils/mock";
import RHFRadioGroup from "../../components/hooks-form/RHFRadioGroup";

const Home = () => {
  const [statesUS] = useState(states);
  const [selectedTimes, setSelectedTimes] = useState<number | null>(null);
  const navigate = useNavigate();
  const formId = useId();
  const methods = useForm<FormProp>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
    watch,
    reset,
    clearErrors,
  } = methods;

  const values = watch();
  console.log(values.preferredTime.length);
  useEffect(() => {
    setSelectedTimes(values.preferredTime.length);
  }, [values.preferredTime]);

  useEffect(() => {
    if (values.business !== "Others") {
      clearErrors("anyOtherText");
    }
  }, [clearErrors, values.business]);

  const { append, remove, fields } = useFieldArray({
    name: "products",
    control,
  });

  const handleOnSubmit: SubmitHandler<FormProp> = async ({
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
    payTerm,
    payType,
    checkDefaultAddress,
    products,
    preferredTime,
    business,
    anyOtherText,
    landmark,
    interestedProducts,
  }) => {
    const productDetails = {
      id: formId.slice(0, 3),
      companyName: companyName,
      contactPerson: contactPerson,
      phone: phone,
      state: state,
      zipCode: zipCode,
      city: city,
      address1,
      address2,
      checkDefaultAddress,
      landmark,
      email: email,
      country,
      payTerm,
      payType,
      products,
      preferredTime,
      business,
      anyOtherText,
      interestedProducts,
    };

    const itemsInCompare: FormProp[] = JSON.parse(
      localStorage.getItem("itemsInCompare") || "[]"
    );

    itemsInCompare.push(productDetails);

    localStorage.setItem("itemsInCompare", JSON.stringify(itemsInCompare));
    navigate("/thankyou");
    reset();
  };

  // const handleCheckboxChange = (value: string) => {
  //   if (selectedTimes.includes(value)) {
  //     setSelectedTimes(selectedTimes.filter((time) => time !== value));
  //   } else {
  //     setSelectedTimes([...selectedTimes, value]);
  //   }
  // };

  console.log(selectedTimes);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="max-w-screen-md mx-auto p-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="companyName"
              label="Company Name*"
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              size="small"
              InputProps={{
                className: "bg-[#FDF0E1]",
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="contactPerson"
              label="Contact Person*"
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              size="small"
              InputProps={{
                className: "bg-[#FDF0E1]",
              }}
            />
          </Box>
        </div>

        <div className="w-full mb-4">
          <Box sx={{ width: "100%" }}>
            <RHFSelect
              fullWidth
              name="business"
              label="Business Type*"
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                className: "bg-[#FDF0E1]",
              }}
              SelectProps={{
                native: false,
                sx: { textTransform: "capitalize" },
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

          {values.business == "Others" && (
            <Box sx={{ width: "100%" }}>
              <RHFTextField
                name="anyOtherText"
                label="Any other business type*"
                size="small"
                rules={{
                  required: {
                    value: values.business === "Others",
                    message: "This field is required!",
                  },
                }}
                disabled={values.business !== "Others"}
                InputProps={{
                  className: `${
                    values.business !== "Others" ? "bg-black" : "bg-[#FDF0E1]"
                  }`,
                }}
              />
            </Box>
          )}
        </div>

        <div className="w-full mb-4">
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="phone"
              label="Contact Person*"
              type="number"
              rules={{
                required: { value: true, message: "This field is required!" },
                pattern: {
                  value: /^[2-9]\d{2}\d{3}\d{4}$/,
                  message:
                    "Invalid US phone number format! (e.g., XXX-XXX-XXXX)",
                },
              }}
              size="small"
              InputProps={{
                className: "bg-[#FDF0E1]",
                startAdornment: (
                  <InputAdornment position="start">
                    <div className="flex items-center gap-2">
                      <img src={usflag} className="h-4" /> +1
                    </div>
                    <div className="px-4">
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ backgroundColor: "gray" }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>

        <div className="w-full mb-4">
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="email"
              type="email"
              label="Email Address*"
              rules={{
                required: { value: true, message: "This field is required!" },
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
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="address1"
              label="Address Line 1*"
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              size="small"
              InputProps={{
                className: "bg-[#FDF0E1]",
              }}
            />
          </Box>
        </div>

        <div className="w-full mb-4">
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="address2"
              label="Address Line 2*"
              rules={{
                required: { value: true, message: "This field is required!" },
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
            <Box sx={{ width: "100%" }}>
              <RHFTextField
                name="city"
                label="City*"
                rules={{
                  required: { value: true, message: "This field is required!" },
                }}
                size="small"
                InputProps={{
                  className: "bg-[#FDF0E1]",
                }}
              />
            </Box>
          </div>

          <div className="w-full mb-4">
            <Box sx={{ width: "100%" }}>
              <RHFSelect
                fullWidth
                name="state"
                label="State*"
                rules={{
                  required: { value: true, message: "This field is required!" },
                }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  className: "bg-[#FDF0E1]",
                }}
                SelectProps={{
                  native: false,
                  sx: { textTransform: "capitalize" },
                }}
              >
                {statesUS.map(({ abbreviation, name }) => (
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
            <Box sx={{ width: "100%" }}>
              <RHFTextField
                name="landmark"
                label="Landmark*"
                rules={{
                  required: { value: true, message: "This field is required!" },
                }}
                size="small"
                InputProps={{
                  className: "bg-[#FDF0E1]",
                }}
              />
            </Box>
          </div>

          <div className="w-full mb-4">
            <Box sx={{ width: "100%" }}>
              <RHFTextField
                name="zipCode"
                label="Zip code*"
                rules={{
                  required: { value: true, message: "This field is required!" },
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
            <Box sx={{ width: "100%" }}>
              <RHFTextField
                name="country"
                label="Country*"
                rules={{
                  required: { value: true, message: "This field is required!" },
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
          <RHFCheckbox
            label="Use it as my Billing Address"
            name="checkDefaultAddress"
          />
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
          Payment Information
        </Typography>
        <div className="w-full mb-4">
          <label htmlFor="" className="font-semibold">
            Pay Term*:
          </label>
          {/* TODO: rules is pending */}
          <RHFRadioGroup
            rules={{ required: { value: true, message: "This field is req!" } }}
            name="payTerm"
            options={PAY_TERM}
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="" className="font-semibold">
            Pay Type*:
          </label>
          <RHFRadioGroup
            rules={{ required: { value: true, message: "This field is req!" } }}
            name="payType"
            options={PAY_TYPE}
          />
        </div>

        <div className="w-full mb-4">
          <Box sx={{ width: "100%" }}>
            <RHFTextField
              name="companyTurnover"
              label="Company's Turnover (per annum)"
              type="number"
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              size="small"
              InputProps={{
                className: "bg-[#FDF0E1]",
                startAdornment: (
                  <InputAdornment position="start">
                    <div>
                      <Typography variant="body1" sx={{ color: "black" }}>
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
            rules={{ required: { value: true, message: "This field is req!" } }}
            name="interestedProducts"
            options={PRODUCT_CATEGORY}
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="" className="font-semibold">
            Preferred Products:
          </label>
          <Box
            className="customScrollbar"
            sx={{ overflowY: "auto", height: "auto", maxHeight: "450px", p: 1 }}
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
                      name={`products.${index}.preferredProducts`}
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
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          className: "bg-[#FDF0E1]",
                        }}
                        SelectProps={{
                          native: false,
                          sx: { textTransform: "capitalize" },
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
                                preferredProducts: "",
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

                      <Divider sx={{ my: 4 }} />
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

                      <Divider sx={{ my: 4 }} />
                    </>
                  )}
                </div>
              );
            })}
          </Box>
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
            <RHFMultiCheckbox
              rules={{
                required: {
                  value: selectedTimes && selectedTimes > 1 ? true : false,
                  message: "Make sure at least two checkboxes are checked!",
                },
              }}
              options={TIME_OPTIONS}
              name="preferredTime"
            />
          </div>

          <FormHelperText>**Select at least 2 slots</FormHelperText>
          {errors.preferredTime && (
            <FormHelperText error>
              {errors.preferredTime.message}
            </FormHelperText>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#00AA5C",
            "&:hover": { backgroundColor: "#00AA5C" },
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
