import router from "../../vrouter/router"
import On from "../../const/on"
import {GO} from "../../const/go"

export default {
    [On.GO_LOGIN]: ({}) => router.push({name: GO.LOGIN}),
}