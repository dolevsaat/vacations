import { useEffect, useState } from "react";
import "./AdminVacationCard.css";
import notifyService from "../../../../Services/NotifyService";
import VacationModel from "../../../../Models/VacationModel";
import appConfig from "../../../../Utils/AppConfig";
import FollowVacation from "../../../AdminArea/AdminVacations/FollowVacation/FollowVacation";
import { AuthState, authStore } from "../../../../Redux/AuthState";
import jwtAxios from "../../../../Services/JwtAxios";
import UserModel from "../../../../Models/UserModel";
import { NavLink } from "react-router-dom";

interface VacationCardProps {
    vacation: VacationModel;
    userId: number;
    onDeleteVacation: (vacationId: number) => void;
}

function parseSocketIODate(realDate: string) {
    if (!realDate.includes("T")) return realDate;
    const parts = realDate.split('T');
    const date = parts[0];
    const dateParts = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const time = parts[1];
    return `${day}/${month}/${year} - ${time}`;
}

function AdminVacationCard(props: VacationCardProps): JSX.Element {
    const [followCount, setFollowCount] = useState(0);
    const [user, setUser] = useState<UserModel>();
    useEffect(() => {
        async function getFollowersCount() {
            try {
                const response = await jwtAxios.get(appConfig.followersUrl + props.vacation.vacationId);
                setFollowCount(response.data.length);
            } catch (err: any) {
                notifyService.error(err);
            }
        }
        getFollowersCount();
    }, [props]);

    useEffect(() => {
        setUser(authStore.getState().user);
    }, []);

    return (
        <div className="AdminVacationCard">
            <div className="card">
                <div className="more-details">
                    <NavLink to={"/vacations/details/" + props.vacation.vacationId}>More Details</NavLink>
                </div>
                {props.vacation && user &&
                    <FollowVacation key={props.vacation.vacationId} vacationId={props.vacation.vacationId} userId={user.userId}></FollowVacation>
                }
                <img className="card-img-top" src={appConfig.imagesUrl + props.vacation.imageUrl} alt="Vacation Card" />
                <div className="card-body">
                    <h5 className="card-title">{props.vacation.name}</h5>
                    <div className="vacationPrice">{props.vacation.price.toLocaleString()}.00 $</div>
                    <div className="card-footer text-muted">
                        Starts At {parseSocketIODate(props.vacation.dateStart)}
                        <br />
                        Ends At {parseSocketIODate(props.vacation.dateEnd)}
                    </div>
                    <p className="card-text">{props.vacation.description}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminVacationCard;
