"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Dashtitle from "@/assets/images/titleDashboard.svg";
import CustomCard from "@/components/customCard";
import TeamCard from "@/components/teamCard";
import axios, { AxiosError, type AxiosResponse } from "axios";
import {
  useIdeaStore,
  useLeaderStore,
  useTeamDataStore,
  useTeamStore,
  useUserStore,
  showModalStore,
} from "@/store/store";
import Loading from "../loading";
import TrackComponent from "@/components/track/TrackComponent";
import toast, { Toaster } from "react-hot-toast";
import { refresh, type userProps } from "@/interfaces";
import { type APIResponse } from "@/schemas/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import ToastContainer from "@/components/ToastContainer";
import Link from "next/link";
import TimelineComponent from "@/components/timeline/timelineComponent";
import LeaveTeam from "@/components/team/leaveTeam";
import Kick from "@/components/team/kick";

interface ideaProps {
  message: string;
  status: boolean;
  data?: {
    title: string;
    description: string;
    track: string;
    github_link: string;
    figma_link: string;
    others: string;
  };
}

interface teamProps {
  data: {
    token_expired?: boolean;
  };
  message: string;
  status: string;
}

export default function HomePage() {
  const router = useRouter();
  const { idea, setIdea } = useIdeaStore();
  const { team, setTeam } = useTeamStore();
  const { user, setUser } = useUserStore();
  const [getIdea, SetIdea] = useState("");
  const { teamData, setTeamData } = useTeamDataStore();
  const { isLeader, setIsLeader } = useLeaderStore();
  const { showModal, setShowModal } = showModalStore();
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          nallaData: "",
        },
        {
          withCredentials: true,
        },
      );
      localStorage.clear();
      void router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            await refresh();
            console.log("401");
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

  const handleLogout = async () => {
    void toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Something went wrong!",
    });
    void router.push("/");
  };

  const fetchData = async () => {
    try {
      const response: AxiosResponse<userProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data.is_leader);
      setIsLeader(response.data.data.is_leader);
      console.log(isLeader);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            void router.push("/");
            break;
          case 404:
            console.log("no team");
            break;
          case 409:
            console.log("Not in team");
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await axios.get<APIResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/team`,
        {
          withCredentials: true,
        },
      );
      setTeamData(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<APIResponse>;
        switch (axiosError.response?.status) {
          case 401:
            void router.push("/");
            break;
          case 404:
            if (axiosError.response?.data.message === "user does not exist") {
              router.push("/");
            }
            break;
          case 417:
            setTeam(true);
            console.log("no team");
            break;
          case 200:
            setTeam(true);
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

  const fetchIdea = async () => {
    try {
      const response: AxiosResponse<ideaProps> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/idea`,
        {
          withCredentials: true,
        },
      );
      SetIdea("idea found");
      console.log("FETCH IDEA: ", response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<APIResponse>;
        switch (axiosError.response?.status) {
          case 401:
            router.push("/");
            break;
          case 404:
            if (axiosError.response?.data.message === "user does not exist") {
              router.push("/");
            }
            console.log("no team");
            break;
          case 417:
            console.log("team no idea");
            break;
          case 409:
            setIdea(409);
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  };

  useEffect(() => {
    const fetchDataAndLogin = async () => {
      // await login();
      await fetchData();
      await fetchIdea();
    };
    void fetchDataAndLogin();
  }, []);

  useEffect(() => {
    if (user.data.team_id === "00000000-0000-0000-0000-000000000000") {
      console.log("Loner saala");
      setTeam(true);
    } else {
      void fetchTeam();
    }
    if (user.data.is_leader) {
      console.log("Leader saala");
      setIsLeader(true);
    }
    if (user.data.is_leader)
      if (user.data.id === teamData.team?.leader_id) {
        setIsLeader(true);
      }
  }, []);

  const noTeamCard = [
    {
      text: "+ Create Team",
      showModal: true,
      modalType: "CreateTeam",
    },
    {
      text: "Join Team",
      showModal: true,
      modalType: "JoinTeam",
    },
  ];
  const ideaTherecard = [
    {
      text: "View Idea",
      showModal: true,
      modalType: "IdeaSubmit",
    },
    {
      text: "Edit idea",
      showModal: false,
      modalType: "EditIdea",
      routeTo: "/edit-idea",
    },
  ];
  const ideaCard = [
    {
      text: "Submit An Idea",
      showModal: false,
      modalType: idea === 409 ? "Choice" : "JoinTeam",
      routeTo: "/submit-idea",
    },
  ];

  const notLeader = [
    {
      text: "View Idea",
      showModal: true,
      modalType: "IdeaSubmit",
    },
  ];

  return (
    <>
      <ToastContainer />
      <main className="flex h-fit flex-col items-start overflow-x-hidden bg-[#F4F5FA] lg:h-screen">
        <div className="flex h-[10%] w-full items-center justify-between gap-x-8 bg-background px-6 py-2">
          <div className="flex flex-row gap-8">
            <Logo className="h-9/10 w-auto" />
            <Image src={Dashtitle as HTMLImageElement} alt="title" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-10">
              {/* This bkl is causing Hydration Error */}
              {/* <Button variant="ghost" size="icon">
                <User />
              </Button> */}

              <div>
                <User />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/profile">
                <DropdownMenuLabel className="cursor-pointer">
                  Profile
                </DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                className="cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col">
          {showModal === "leave" && <LeaveTeam />}
          {showModal === "kick" && <Kick />}
          <div className="my-8 px-4">
            <TimelineComponent count={4} />
          </div>
          <div className="mt-4 flex h-fit w-full flex-col justify-between gap-4 overflow-y-auto px-4 md:flex-row lg:h-[85%]">
            {team ? (
              <CustomCard
                title="Your Devsoc Team"
                cardImage="user"
                cardContent="No Team Members Yet?"
                cardDesc="Start A New Team or Join One"
                buttonDetails={noTeamCard}
              />
            ) : (
              <TeamCard {...teamData} />
            )}
            <CustomCard
              title="Idea Submission"
              cardImage="ideaSubmissionImg"
              cardContent={
                getIdea === "idea found" ? "Idea Submitted" : "No Idea Yet"
              }
              cardDesc={
                getIdea === "idea found"
                  ? "Edit or View Idea"
                  : "Submit an Idea"
              }
              buttonDetails={
                getIdea === "idea found"
                  ? isLeader
                    ? ideaTherecard
                    : notLeader
                  : ideaCard
              }
            />
            <TrackComponent />
          </div>
        </div>
      </main>
    </>
  );
}