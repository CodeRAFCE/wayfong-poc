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

type StoreProps = {
	companyName: string;
	contactPerson: string;
	phone: number | string;
	email: string;
	city: string;
	state: string;
	id: string;
};

const Lists = () => {
	const storedData = localStorage.getItem("itemsInCompare");
	const store = storedData ? JSON.parse(storedData) : null;

	const [open, setOpen] = useState(false);
	const [storageId, setStorageId] = useState<string | null>();
	const selectedId = store?.filter(({id}: {id: string}) => storageId === id);

	const dataById = selectedId[0];

	const handleClickOpen = (id: string) => {
		setOpen(true);
		setStorageId(id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	console.log(store);

	return (
		<div className="max-w-screen-2xl mx-auto">
			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Company Name</TableCell>
							<TableCell align="right">Contact Person</TableCell>
							<TableCell align="right">Phone Number</TableCell>
							<TableCell align="right">Email</TableCell>
							<TableCell align="right">City</TableCell>
							<TableCell align="right">State</TableCell>
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

						<div className="flex items-center gap-4">
							<span className="font-bold">Products:</span>
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
												<span className="font-bold">Preferred Products: {preferredProducts}</span>
												<span className="font-bold">Order Frequency: {orderFrequency}</span>
												<span className="font-bold">Quantity: {quantity}</span>
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
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleClose} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Lists;
