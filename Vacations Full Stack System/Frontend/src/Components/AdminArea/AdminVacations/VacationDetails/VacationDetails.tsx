import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Models
import VacationModel from "../../../../Models/VacationModel";
// Services
import notifyService from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationService";
import Spinner from "../../../LayoutArea/Spinner/Spinner";
// CSS
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    // Get object containing all route params:
    const params = useParams();

    // Product state:
    const [vacation, setVacation] = useState<VacationModel>();

    // Navigate hook:
    const navigate = useNavigate();

    // Fetch product once:
    useEffect(() => {

        // Extract id parameter:
        const vacationId = +params.vacationId;

        // Get product: 
        vacationsService.getOneVacation(vacationId)
            .then(responseVacation => setVacation(responseVacation))
            .catch(err => notifyService.error(err));

    }, []);

    async function deleteMe() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await vacationsService.deleteVacation(vacation.vacationId);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    if (!vacation) return <Spinner />; // One liner

    return (
        <div className="VacationDetails">

            <h2>Vacation Details</h2>

            <h3>Name: {vacation?.name}</h3>
            <h3>Description: {vacation?.description}</h3>
            <h3>DateStart: {vacation?.dateStart}</h3>
            <h3>DateEnd: {vacation?.dateEnd}</h3>
            <h3>Price: {vacation?.price}</h3>

            <img src={vacation?.imageUrl} />
            <br />
            <br />

            <NavLink to="/vacations">Back</NavLink>
            <span> | </span>
            <NavLink to={"/vacations/edit/" + vacation?.vacationId}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>

        </div>
    );
}

export default VacationDetails;
