import VacationModel from "../Models/VacationModel";
import { createStore } from "redux";

// 1. VacationsState = The application level state regarding products:
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Vacations Action Type - which actions we can perform on our products global state:
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

// 3. Vacations Action = interface describing an object for performing one action

export interface VacationsAction {
    type: VacationsActionType; // which action we want to do
    payload: any; // which data we send
}

export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(addedVacation: VacationModel): VacationsAction {

    return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}
export function vacationUpdatedAction(updatedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedVacation };
}
export function vacationDeletedAction(id: number): VacationsAction {
    return { type: VacationsActionType.VacationDeleted, payload: id };
}

// 4. Vacations Reducer - the main function performing the needed action.
export function VacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // perform the needed action on the newState:

    switch (action.type) {

        case VacationsActionType.VacationsDownloaded:
            newState.vacations = action.payload;
            break;

        case VacationsActionType.VacationAdded: // payload = added vacation
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.VacationUpdated: // payload = updated vacation
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);
            if (action.payload.followCount !== undefined) {
                newState.vacations[indexToUpdate].followCount = action.payload.followCount;
                break;
            }
            if (newState.vacations[indexToUpdate] !== undefined)
                if (action.payload.image === undefined || action.payload.image === "null")
                    action.payload.image = newState.vacations[indexToUpdate].image;
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.VacationDeleted: // payload = vacation id to delete
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;
    }

    //Return the newState
    return newState;
}
// 5. Vacations Store - The manager object, handling redux:
export const vacationsStore = createStore(VacationsReducer);
