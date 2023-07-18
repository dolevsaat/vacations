import { useForm } from "react-hook-form";
import "./InsertVacation.css";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notifyService from "../../../../Services/NotifyService";
import jwtAxios from "../../../../Services/JwtAxios";
import appConfig from "../../../../Utils/AppConfig";


function InsertVacation(): JSX.Element {

    // Use form:
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // Navigate - Routing:
    const navigate = useNavigate();

    // This function send to server the new vacation:
    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            const response = await jwtAxios.post<VacationModel>(appConfig.vacationsUrl, VacationModel.convertToFormData(vacation));
            const addedVacation = response.data;
            notifyService.success("Vacation Has been added. Vacation : " + vacation.name)
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (

        <div className="Insert">
            <NavLink to="/admin-vacations">
                {" "}
            </NavLink>

            <form onSubmit={handleSubmit(send)}>

                <label>Name:</label>
                <input type="text" {...register("name", {
                    required: { value: true, message: "Missing name." },
                    minLength: { value: 2, message: "Name is too short." },
                    maxLength: { value: 100, message: "Name must contain at most 100 characters." }
                })} />
                {formState.errors.name?.message.length > 0 && <div className="alert alert-warning">{formState.errors.name?.message}</div>}

                <label>Description:</label>
                <textarea rows={6} cols={45} {...register("description", {
                    required: { value: true, message: "Missing Destination." },
                    minLength: { value: 2, message: "Description is too short." },
                    maxLength: { value: 1000, message: "Description must contain at most 100 characters." }
                })}> </textarea>
                {formState.errors.description?.message.length > 0 && <div className="alert alert-warning">{formState.errors.description?.message}</div>}

                <label>Date start:</label>
                <input type="datetime-local" name="dateStart" {...register("dateStart", {
                    required: { value: true, message: "Missing Vacation Start Date." }
                })} />
                {formState.errors.dateStart?.message.length > 0 && <div className="alert alert-warning">{formState.errors.dateStart?.message}</div>}

                <label>Date end:</label>
                <input type="datetime-local" name="dateEnd" {...register("dateEnd", {
                    required: { value: true, message: "Missing Vacation End Date." }
                })} />
                {formState.errors.dateEnd?.message.length > 0 && <div className="alert alert-warning">{formState.errors.dateEnd?.message}</div>}

                <label>Price:</label>
                <input type="number" step="0.01" {...register("price", {
                    required: { value: true, message: "Missing price." },
                })} required min={0} max={10000} />
                {formState.errors.price?.message.length > 0 && <div className="alert alert-warning">{formState.errors.price?.message}</div>}

                <label className="form-label">Image:</label>
                <input className="form-control fileInput" type="file" name="image" accept="imageName/*" {...register('image', {
                    required: { value: true, message: "Missing image." }
                })} />
                {formState.errors.image?.message.length > 0 && <div className="alert alert-warning">{formState.errors.image?.message}</div>}

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>

            </form>

        </div>
    );
}



export default InsertVacation;
