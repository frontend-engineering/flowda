import { wfCfgSchema } from "@flowda/types";
import { injectable } from "inversify";
import { z } from "zod";

@injectable()
export class WorkflowConfigModel {
    _wfCfgs: z.infer<typeof wfCfgSchema> | undefined

    setWfCfgs(wfCfgs: z.infer<typeof wfCfgSchema>) {
        this._wfCfgs = wfCfgs
    }

    get wfCfgs() {
        if (!this._wfCfgs) throw new Error(`wfCfgs is undef, set first`)
        return this._wfCfgs
    }

    getWfCfg(taskDefinitionKey: string) {
        const ret = this.wfCfgs.find(cfg => cfg.taskDefinitionKey === taskDefinitionKey)
        if (!ret) throw new Error(`not found workflow config, taskDefinitionKey:${taskDefinitionKey}`)
        return ret
    }
}
