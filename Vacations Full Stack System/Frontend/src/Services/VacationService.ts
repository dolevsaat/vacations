import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationState";

class VacationService {

    // Get all vacations: 
    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations from global state:
        let vacations = vacationsStore.getState().vacations;

        // If we don't have vacations - get them from backend:
        if (vacations.length === 0) {

            // Get from REST API vacations: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Extract vacations: 
            vacations = response.data; // data will be ProductModel[]

            // Update global store: 
            vacationsStore.dispatch({ type: VacationsActionType.VacationUpdated, payload: vacations });
        }

        // Return:
        return vacations;
    }

    // Get vacation by userId: 
    public async getVacationsByUserID(userId: number): Promise<VacationModel[]> {

        // Take vacations from global state:
        let vacations = vacationsStore.getState().vacations;

        // Find the needed vacation: 
        let vacation = vacations.find(v => v.vacationId === userId);

        // If vacation doesn't exist - get it from backend:
        if (!vacation) {

            // Get product from REST API:
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + userId);

            // Extract product:
            vacations = response.data;

            // No need to update global state

            // Return:
            return vacations;
        }
    }

    // Get one vacation: 
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // Take products from global state:
        let vacations = vacationsStore.getState().vacations;

        // Find the needed product: 
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // If product doesn't exist - get it from backend:
        if (!vacation) {

            // Get product from REST API:
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);

            // Extract product:
            vacation = response.data;

            // No need to update global state
        }
        // Return:
        return vacation;
    }

    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {

        // // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation);

        // Get the added vacation:
        const addedVacation = response.data;

        // Add that addedVacation also to the global state: 
        vacationsStore.dispatch({ type: VacationsActionType.VacationAdded, payload: addedVacation });
    }

    //  Update Vacation
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + "edit/" + vacation.vacationId, vacation, { headers });

        // Get the updated vacation:
        const updatedVacation = response.data;

        // Update global store with the updatedVacation: 
        vacationsStore.dispatch({ type: VacationsActionType.VacationUpdated, payload: updatedVacation });

    }

    // Delete vacation: 
    public async deleteVacation(vacationId: number): Promise<void> {

        // Delete vacation on server:
        await axios.delete(appConfig.vacationsUrl + vacationId);

        // Delete that vacation form our global store: 
        vacationsStore.dispatch({ type: VacationsActionType.VacationDeleted, payload: vacationId });

    }
}

const vacationService = new VacationService();

export default vacationService;
