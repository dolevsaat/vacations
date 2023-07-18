class VacationModel {
    public vacationId: number;
    public name: string;
    public description: string;
    public dateStart: string;
    public dateEnd: string;
    public price: number;
    public followCount: number;
    public departureTime: string;
    public returnTime: string;
    public image: File;
    public imageUrl: string;

    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", vacation.name);
        myFormData.append("description", vacation.description);
        myFormData.append("dateStart", vacation.dateStart);
        myFormData.append("dateEnd", vacation.dateEnd);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("imageUrl", vacation.imageUrl);
        myFormData.append("image", vacation.image);
        return myFormData;
    }
}

export default VacationModel;
