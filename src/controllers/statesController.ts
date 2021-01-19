import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service'; 
import { IState } from "../modules/state/model";
import StateService from "../modules/state/service";

export class StateController {

	private stateService: StateService = new StateService(); 

	public createStates(req: Request, res: Response) {
		const { stateName, countryName, countryCode, fipsCode, ISO2 } = req.body;
		if (stateName && countryName && countryCode && fipsCode && ISO2) {
			const stateParams: IState = {
				stateName: stateName,
				countryName: req.params.countryName,
				countryCode: req.params.countryCode,
				fipsCode: fipsCode,
				ISO2: ISO2,
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
}