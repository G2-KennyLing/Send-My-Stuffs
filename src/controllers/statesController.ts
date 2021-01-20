import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service'; 
import { IState } from "../modules/state/model";
import StateService from "../modules/state/service";

export class StateController {

	private stateService: StateService = new StateService(); 

	public createStates(req: Request, res: Response) {
		const { stateName, country, fipsCode, iso2 } = req.body;
		if (stateName && country && fipsCode && iso2) {
			const stateParams: IState = {
				stateName: stateName,
				country: req.params.country,
				fipsCode: fipsCode,
				iso2: iso2,
				modificationNotes: [{
					modifiedOn: new Date(),
					modifiedBy: null,
					modificationNote: "Created State Success" 
				}]
			}
			this.stateService.createStates(stateParams, (err: any, stateData: IState) => {
				if (err) {
					mongoError(err, res)
				}else {
					successResponse('Created State Success', stateData, res)
				}
			})
		} else {
			insufficientParameters(res)
		}
	}

	public getListStates(req: Request, res: Response) {
		this.stateService.filterStates({}, (err: any, stateData: IState) => {
			if (err) {
				return mongoError(err, res)
			}else {
				successResponse("Get list state successful", stateData, res)
			}
		})
	}

	public getState(req: Request, res: Response) {
		const detailStateId = { _id: req.params.id };
		this.stateService.filterState(detailStateId, (err: Error, stateData: IState) => {
			if (err) {
				mongoError(err, res)
			}
			if (!stateData) {
				failureResponse("State is not found", {}, res)
			}else {
				successResponse("Get state successful", stateData, res)
			}
		})
	}

	public updateState(req: Request, res: Response) {
		const { stateName, country, fipsCode, iso2, status } = req.body;
		if(!(stateName && country && fipsCode && iso2 && status)) {
			insufficientParameters(res)
		} const stateParams: IState = {
			stateName: stateName,
			country: req.params.country,
			fipsCode: fipsCode,
			iso2: iso2
		}
		this.stateService.updateState(stateParams, (err: any, stateData: IState) => {
			if(err) {
				mongoError(err, res)
			}
			if(!stateData) {
				failureResponse("Update state failed", {}, res)
			}else{
				successResponse("Update state successful", { stateData }, res)
			}
		})
	}
}