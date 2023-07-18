import "./FollowersChart.css";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { NavLink } from "react-router-dom";
// Models
import FollowerModel from "../../../../Models/FollowerModel";
import VacationModel from "../../../../Models/VacationModel";
// Services
import followersService from "../../../../Services/FollowersService";
import notifyService from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationService";
// Components
import DestinationCSV from "../DestinationCSV/DestinationCSV";

// Chart Data interface
interface DataInterface {
    vacationId: number;
    name: string;
    description: string;
    followers: number;
    destination: string;
}

export default function FollowersChart() {
    // Followers state
    const [followers, setFollowers] = useState<FollowerModel[]>([]);

    // All vacations state
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Vacations with followers state
    const [followedVacations, setFollowedVacations] = useState<boolean>(false);

    // Vacations By country state
    const [vacationsByCountry, setVacationsByCountry] = useState<VacationModel[]>([]);

    // CSV vacations
    const [csvVacations, setCsvVacations] = useState<VacationModel[]>([]);

    // Date state
    const [data, setData] = useState<DataInterface[]>([]);

    // Active index state -> for tooltip
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Tooltip state -> for tooltip display
    const [isTooltip, setIsTooltip] = useState<boolean>(false);


    // Get All followers vacations from server
    useEffect(() => {
        try {
            followersService
                .getAllFollowers()
                .then((dbFollowers) => setFollowers(dbFollowers));

            vacationsService.getAllVacations().then((dbVacations) => {
                setVacations(dbVacations);
                setVacationsByCountry(dbVacations);
            });
        } catch (err: any) {
            notifyService.error(err);
        }
    }, []);

    // Create data for graph
    useEffect(() => {
        let vacations = vacationsByCountry;
        // Filtering vacations that have followers, and set it to data state
        if (followers && vacationsByCountry.length > 0) {
            if (followedVacations) {
                vacations = vacationsByCountry.filter((vacation) =>
                    followers.some(
                        (follower) => follower.vacationId === vacation.vacationId
                    )
                );
            }
            const newData = vacations.map((vacation) => {
                const numOfFollowers = followers.reduce((count, follower) => {
                    return follower.vacationId === vacation.vacationId
                        ? count + 1
                        : count;
                }, 0);

                return {
                    vacationId: vacation.vacationId,
                    name: vacation.name,
                    description: vacation.description,
                    followers: numOfFollowers,
                    destination: `${vacation.name} - ${vacation.description}`,
                };
            });

            setData(newData);
            setCsvVacations(vacations);
        }
    }, [followers, vacations, vacationsByCountry, followedVacations]);

    // Handle only followed vacations display
    function handleOnlyFollowed(): void {
        setFollowedVacations(!followedVacations);
    }

    // Custom tooltip function
    function CustomTooltip({
        data,
        active,
    }: {
        data: DataInterface;
        active: boolean;
    }) {
        if (active && data) {
            return (
                <div className="custom-tooltip">
                    <h3>Vacation Info</h3>
                    <p>Vacation ID: {data.vacationId}</p>
                    <p>Name: {data.name}</p>
                    <p>Description: {data.description}</p>
                    <p>Followers: {data.followers}</p>
                </div>
            );
        }

        return null;
    }

    // ============================= HTML =============================
    return (
        <>
            <h2 className="follower-chart-title"> Followers Chart</h2>
            <div className="followersChart">
                <div className="menu">
                    <DestinationCSV vacations={csvVacations} followers={followers} />
                    <NavLink to={"/vacations"}>
                        {" "}
                        <button className="gold-btn">Back to vacations</button>
                    </NavLink>
                </div>

                <div className="followers-graph">
                    <div className="checkbox-wrapper">
                        <label className="switch">
                            <input type="checkbox" onChange={handleOnlyFollowed} />
                            <div className="slider round"></div>
                        </label>
                        <small> Show only followed vacation</small>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="1" spacing={"even"} />

                            <XAxis dataKey="city" className="citiesX" spacing={"even"} />

                            <YAxis />

                            <Tooltip
                                content={
                                    isTooltip && (
                                        <CustomTooltip data={data[activeIndex]} active={true} />
                                    )
                                }
                            />

                            <Bar
                                className="chart-bar"
                                dataKey="followers"
                                stackId="a"
                                onMouseEnter={(data, index) => {
                                    setActiveIndex(index);
                                    setIsTooltip(true);
                                }}
                                onMouseLeave={() => {
                                    setActiveIndex(null);
                                    setIsTooltip(false);
                                }}
                            />
                            <Bar
                                className="chart-bar"
                                dataKey="hotel"
                                stackId="a"
                                style={{ display: "none" }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
