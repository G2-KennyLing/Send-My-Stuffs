import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service'; 
import { IState } from "../modules/state/model";
import StateService from "../modules/state/service";

export class StateController {
	private stateService: StateService = new StateService(); 

	public createStates(req: Request, res: Response) {
		const { stateName, action, country, fipsCode, iso2 } = req.body;
		if (stateName && action && country && fipsCode && iso2) {
			const stateParams: IState = {
				stateName: stateName,
				action: action,
				country: country,
				fipsCode: fipsCode,
				iso2: iso2,
				modificationNotes: [{
					modifiedOn: new Date(),
					modifiedBy: null,
					modificationNote: "Created state successful" 
				}]
			}
			this.stateService.createStates(stateParams, (err: any, stateData: IState) => {
				if (err) {
					return mongoError(err, res)
				}else {
					return successResponse('Created state successful', stateData, res)
				}
			})
		} else {
			return insufficientParameters(res)
		}
	}

	public getListStates(req: Request, res: Response) {
		this.stateService.filterStates({}, (err: any, stateData: IState) => {
			if (err) {
				return mongoError(err, res)
			}else {
				return successResponse("Get list state successful", stateData, res)
			}
		})
	}

	public getState(req: Request, res: Response) {
		const detailStateId = { _id: req.params.id };
		this.stateService.filterState(detailStateId, (err: Error, stateData: IState) => {
			if (err) {
				return mongoError(err, res)
			}
			if (!stateData) {
				return failureResponse("State is not found", {}, res)
			}else {
				return successResponse("Get state successful", stateData, res)
			}
		})
	}

	public updateState(req: Request, res: Response) {
		const { stateName, action, country, fipsCode, iso2, status } = req.body;
		if (stateName && action && country && fipsCode && iso2 && status) {
			const updateStateId = { _id: req.params.id }
			this.stateService.filterStates(updateStateId, (err: any, stateData: IState) => {
				if (err) {
					return mongoError(err, res)
				}
				if (stateData) {
					const stateParams: IState = {
						_id: req.params.id, 
						stateName: stateName ? stateName : stateData.stateName,
						action: action ? action : stateData.action,
						country: country ? country : stateData.country,
						fipsCode: fipsCode ? fipsCode : stateData.fipsCode,
						iso2: iso2 ? iso2 : stateData.iso2,
						status: status ? status : stateData.status,
						modificationNotes: [{
							modifiedOn: new Date(Date.now()),
    						modifiedBy: null,
    						modificationNote: "State data updated",
						}]
					}
					this.stateService.updateState(stateParams, (err: any) => {
						if (err) {
							return mongoError(err, res)
						} else {
							return successResponse("Update state successful", stateParams, res)
						}
					});
				} else {
					return failureResponse("Parameter invalid", null, res)
				}
			})
		}
	}

	public isDelete(req: Request, res: Response) {

        const _id = req.params.id ;
        this.stateService.filterState({_id}, (err: any, stateData: IState) =>{
            if(err){
                return mongoError(err, res);
            } if(!stateData){
                return failureResponse("State is not found", null, res);
            }
            this.stateService.deleteState(_id, {$set:{deletedAt: new Date()}}, (err: Error, stateData: IState) =>{
                if(err){
                    return mongoError(err, res);
                }
                	return successResponse("Delete state successful", stateData, res)
            })
        })
        
    }

}