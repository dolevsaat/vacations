import "./UpdateVacation.css";
import notifyService from "../../../../Services/NotifyService";
import VacationModel from "../../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vacationService from "../../../../Services/VacationService";

function EditProduct(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();
    const [uploadedImage, setUploadedImage] = useState<FileList>();

    function formattingDate(propsDate: string): string {
        const date = new Date(propsDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const localTimeString = `${day}-${month}-${year}`;
        return localTimeString;
    }

    // Get vacation to edit:
    useEffect(() => {
        const vacationId = +params.vacationId;
        vacationService.getOneVacation(vacationId)
            .then(responseVacation => {
                setValue("vacationId", responseVacation.vacationId);
                setValue("name", responseVacation.name);
                setValue("description", responseVacation.description);
                setValue("dateStart", formattingDate(responseVacation.dateStart));
                setValue("dateEnd", formattingDate(responseVacation.dateEnd));
                setValue("price", responseVacation.price);
                setVacation(responseVacation);

            })
            .catch(err => notifyService.error(err));
    }, []);

    function handleUploadImages(
        event: React.ChangeEvent<HTMLInputElement>
    ): void {
        const image = event.target.files;
        setUploadedImage(image as unknown as FileList);
    }

    async function send(updatedVacation: VacationModel) {
        try {

            if (uploadedImage) {
                updatedVacation.image = (uploadedImage).item(0);
                updatedVacation.imageUrl = (uploadedImage.item(0).name);
            }
            else {
                updatedVacation.imageUrl = vacation.imageUrl.replace("http://localhost:4000/api/images/", "");
            }

            // vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.updateVacation(updatedVacation);
            window.location.reload();
            notifyService.success("Vacation has been updated");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditProduct">

            <h2>Edit vacation</h2>

            {vacation &&

                <form onSubmit={handleSubmit(send)}>

                    <input type="hidden" {...register("vacationId")} />

                    <label>Name:</label>
                    <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                    <label>Description:</label>
                    <input type="textarea" {...register("description")} required minLength={0} maxLength={1000} />

                    <label>date Start:</label>
                    <input type="date" {...register("dateStart")} required />

                    <label>date End:</label>
                    <input type="date" {...register("dateEnd")} required />

                    <label>Price:</label>
                    <input type="number" {...register("price")} required min={0} max={10000} />

                    <label>Image: </label>
                    <input type="file" accept="image/*" onChange={handleUploadImages} />

                    <img src={vacation.imageUrl && vacation.imageUrl} />

                    <button className="blue-btn send-edit">Send</button>

                </form>
            }

        </div>
    );
}

export default EditProduct;


