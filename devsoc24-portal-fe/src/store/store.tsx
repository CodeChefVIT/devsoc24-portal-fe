import { create } from "zustand";
import {
  type userProps,
  type joinTeamModal,
  type teamDataProps,
} from "@/interfaces";

export const useJoinModalStore = create<joinTeamModal>((set) => ({
  showModal: "",
  setShowModal: (showModal: string) => set({ showModal }),
}));

interface ideaStore {
  idea: number;
  setIdea: (setIdea: number) => void;
}

export const useIdeaStore = create<ideaStore>((set) => ({
  idea: 0,
  setIdea: (idea: number) => set({ idea }),
}));

interface teamStore {
  team: boolean;
  setTeam: (setTeam: boolean) => void;
}

export const useTeamStore = create<teamStore>((set) => ({
  team: false,
  setTeam: (team: boolean) => set({ team }),
}));

interface leaderStore {
  isLeader: boolean;
  setIsLeader: (isLeader: boolean) => void;
}

export const useLeaderStore = create<leaderStore>((set) => ({
  isLeader: false,
  setIsLeader: (isLeader: boolean) => set({ isLeader }),
}));

interface teamEditStore {
  edit: boolean;
  setEdit: (setTeam: boolean) => void;
}

export const useTeamEditStore = create<teamEditStore>((set) => ({
  edit: false,
  setEdit: (edit: boolean) => set({ edit }),
}));

interface userStore {
  user: userProps;
  setUser: (setUser: userProps) => void;
}

export const useUserStore = create<userStore>((set) => ({
  user: {
    data: {
      id: "",
      first_name: "",
      last_name: "",
      reg_no: "",
      email: "",
      phone_number: "",
      college: "",
      city: "",
      state: "",
      country: "",
      gender: "",
      role: "",
      is_leader: false,
      team_id: "",
      vit_email: "",
      block: "",
      room: "",
    },
    message: "",
    status: "",
  },
  setUser: (userData: userProps) =>
    set((state) => ({
      ...state,
      user: userData,
    })),
}));

interface teamDataStore {
  teamData: teamDataProps;
  setTeamData: (setTeamData: teamDataProps) => void;
}

export const useTeamDataStore = create<teamDataStore>((set) => ({
  teamData: {
    message: "",
    status: "",
    team: {
      team_name: "",
      team_code: "",
      leader_id: "",
      round: 0,
      users: [{ name: "", reg_no: "", id: "" }],
      idea: {
        title: "",
        description: "",
        track: "",
        github_link: "",
        figma_link: "",
        others: "",
      },
      project: {
        name: "",
        description: "",
        track: "",
        github_link: "",
        figma_link: "",
        others: "",
      },
    },
  },
  setTeamData: (teamDataTemp: teamDataProps) =>
    set((state) => ({
      ...state,
      teamData: teamDataTemp,
    })),
}));

interface showModalStore {
  showModal: string;
  setShowModal: (showModal: string) => void;
}

export const showModalStore = create<showModalStore>((set) => ({
  showModal: "",
  setShowModal: (showModal: string) => set({ showModal }),
})); 

interface kickStore {
  kickMate: string;
  setKickMate: (kickMate: string) => void;
}

export const showkickStore = create<kickStore>((set) => ({
  kickMate: "",
  setKickMate: (kickMate: string) => set({ kickMate }),
}));

interface ideaInterface {
  getIdea: string;
  SetIdea: (idea: string) => void;
}

export const IdeaStore = create<ideaInterface>((set) => ({
  getIdea: "a",
  SetIdea: (getIdea: string) => set({ getIdea }),
}));