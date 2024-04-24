import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import {useState} from "react";
import {PreferredProductsType} from "../../types/form.type";

type StoreProps = {
	companyName: string;
	contactPerson: string;
	phone: number | string;
	email: string;
	city: string;
	state: string;
	id: string;
	address: string;
	products: PreferredProductsType[];
	zipCode: number;
};

const Lists = () => {
	const storedData = localStorage.getItem("itemsInCompare");
	const store: StoreProps[] = storedData ? JSON.parse(storedData) : null;

	const [open, setOpen] = useState(false);
	const [storageId, setStorageId] = useState<string | null>();

	const handleClickOpen = (id: string) => {
		setOpen(true);
		setStorageId(id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const selectedId = store?.filter(({id}) => storageId === id);

	if (!selectedId) {
		return (
			<div className="w-full h-full flex p-6 text-center">
				<h1 className="text-3xl font-bold text-gray-900">Please add user info</h1>
			</div>
		);
	}

	const dataById = selectedId[0];

	return (
		<div className="max-w-screen-2xl mx-auto">
			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{fontWeight: "bold"}}>#ID</TableCell>
							<TableCell sx={{fontWeight: "bold"}} align="right">
								Company Name
							</TableCell>
							<TableCell sx={{fontWeight: "bold"}} align="right">
								Contact Person
							</TableCell>
							<TableCell sx={{fontWeight: "bold"}} align="right">
								Phone Number
							</TableCell>
							<TableCell sx={{fontWeight: "bold"}} align="right">
								Email
							</TableCell>
							<TableCell sx={{fontWeight: "bold"}} align="right">
								City
							</TableCell>
							<TableCell sx={{fontWeight: "bold"}} align="right">
								State
							</TableCell>
						</TableRow>
					</TableHead>
					{store ? (
						<TableBody>
							{store?.map(
								(
									{companyName, contactPerson, phone, email, city, state, id}: StoreProps,
									i: number
								) => (
									<TableRow
										key={i}
										sx={{"&:last-child td, &:last-child th": {border: 0}}}
										onClick={() => handleClickOpen(id)}
									>
										<TableCell component="th" scope="row" sx={{fontWeight: "bold"}}>
											#{id}
										</TableCell>
										<TableCell align="right">{companyName}</TableCell>
										<TableCell align="right">{contactPerson}</TableCell>
										<TableCell align="right">{phone}</TableCell>
										<TableCell align="right">{email}</TableCell>
										<TableCell align="right">{city}</TableCell>
										<TableCell align="right">{state}</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					) : (
						<TableBody>
							<div className="w-full h-full flex p-6">
								<h1 className="text-3xl font-bold text-gray-900">Please add user info</h1>
							</div>
						</TableBody>
					)}
				</Table>
			</TableContainer>

			<Dialog
				maxWidth={"lg"}
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Other Information"}</DialogTitle>
				<DialogContent>
					{/* <DialogContentText id="alert-dialog-description">
						Let Google help apps determine location. This means sending anonymous location data to
						Google, even when no apps are running.
					</DialogContentText> */}

					<div className="p-2">
						{/* SHOW CONTENT HERE */}
						<div className="flex items-center gap-4">
							<span className="font-bold">Company Name:</span>
							<p>{dataById?.companyName}</p>
						</div>
						<div className="flex items-center gap-4">
							<span className="font-bold">Address:</span>
							<p>{dataById?.email}</p>
						</div>
						<div className="flex items-center gap-4">
							<span className="font-bold">Address:</span>
							<p>
								{dataById?.address}, {dataById?.city}, {dataById?.state}, {dataById?.zipCode}
							</p>
						</div>

						<Divider sx={{my: 4}} />

						<div className="">
							<span className="font-semibold text-xl">Products:</span>
							{dataById?.products ? (
								<>
									{dataById?.products?.map(
										({
											preferredProducts,
											orderFrequency,
											quantity,
										}: {
											preferredProducts: string;
											orderFrequency: string;
											quantity: string | number;
										}) => (
											<div className="flex items-center gap-4">
												<span className="font-bold">Preferred Products: </span>
												{preferredProducts}
												<span className="font-bold">Order Frequency: </span>
												{orderFrequency}
												<span className="font-bold">Quantity:</span> {quantity}
											</div>
										)
									)}
								</>
							) : (
								<div> ADD PRODUCTS to view details here</div>
							)}
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Lists;
