import { SET_GROWTH_ASSUMPTIONS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_GROWTH_ASSUMPTIONS:

        // set state to be recalled when GrowthAssumptions Component mounts.
        return action.payload || null;

      default:
        return state;
    }
  }
