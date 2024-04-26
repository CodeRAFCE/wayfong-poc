import {Button} from "@mui/material";
import {CircleCheckBig} from "lucide-react";
import {useNavigate} from "react-router-dom";

const ThankYou = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full h-full text-center flex flex-col items-center justify-center">
			<div className="rounded-full h-40 w-40 bg-[#E3FBE3] flex items-center justify-center">
				<CircleCheckBig className="text-[#00AA5C] h-24 w-24" />
			</div>
			<h1 className="text-3xl font-semibold mb-6">Thank you for your interest!</h1>
			<p>
				Our sales associate will get <br /> back to you
			</p>

			<Button
				onClick={() => navigate("/lists")}
				sx={{backgroundColor: "#00AA5C", "&:hover": {backgroundColor: "#00AA5C"}, color: "#fff", my: 6, px: 4}}
			>
				View list
			</Button>
		</div>
	);
};

export default ThankYou;
