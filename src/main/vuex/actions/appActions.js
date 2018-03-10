import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.MOUNT_APP]: async ({commit}) => {
        commit(Do.ACTIVATE_NEW_FILM);
    }
};
