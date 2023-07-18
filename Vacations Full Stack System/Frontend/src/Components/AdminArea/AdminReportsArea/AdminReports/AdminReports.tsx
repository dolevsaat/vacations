// Components
import VacationsChart from "../VacationsChart/VacationsChart";
import FollowersChart from "../FollowersChart/FollowersChart";

function AdminReports(): JSX.Element {
    return (
        <div className="AdminReports">

            <div className="vacations-graph">

                <FollowersChart />
                <VacationsChart />

            </div>

        </div>
    );
}

export default AdminReports;
