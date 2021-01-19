import { IState } from "./model";
import State from "./schema";

export default class StateService {

	public createStates(stateParams: IState, callback: any) {
		const _session = new State(stateParams);
		_session.save(callback);
	}

	public filterStates(query: any, callback: any) {
		State.find(query, callback)
	}

}