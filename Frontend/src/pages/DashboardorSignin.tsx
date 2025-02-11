// so now this component will make sure if user is logged in with the token already then switch them to the blogs page other wise singin page 

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";

export const DashboardorSignin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // If no token is found, redirect to the sign-in page
        if (!token) {
            navigate("/signup");
            return;
        }

        // If a token exists, try to navigate to the blogs page
        // If an error occurs (e.g., token is invalid), redirect to the sign-in page
        try {
            navigate("/blogs");
        } catch (err) {
            console.error("An error occurred:", err);
            navigate("/signup");
        }
    }, [navigate]);

    // Optional: Add a loading state to avoid flickering
    return <div>
        <SkeletonBlogCard />
        <SkeletonBlogCard />
        <SkeletonBlogCard />
        <SkeletonBlogCard />
    </div>;
};