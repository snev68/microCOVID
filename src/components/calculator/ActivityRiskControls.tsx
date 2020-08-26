import React from 'react'

import { SelectControl } from './SelectControl'
import {
  CalculatorData,
  MAX_ACTIVITY_RISK,
  calculateActivityRisk,
} from 'data/calculate'
import {
  Distance,
  Interaction,
  Setting,
  TheirMask,
  Voice,
  YourMask,
} from 'data/data'

export const ActivityRiskControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
  repeatedEvent: boolean
}> = ({ data, setter, repeatedEvent }): React.ReactElement => {
  const header = <header id="activity-risk">Step 3 - Activity Risk</header>

  const activityRisk = calculateActivityRisk(data)

  if (repeatedEvent) {
    return (
      <React.Fragment>
        {header}
        <SelectControl
          id="interaction"
          label="Type of Interaction"
          data={data}
          setter={setter}
          source={Interaction}
        />
        <span className="readout">
          Activity Risk: <b>{((activityRisk || 0) * 100).toFixed(2)}%</b> chance
          of getting COVID from one person who currently has COVID
        </span>
        <div className="empty">
          When estimating your risk of infection from a household member or
          partner/spouse we assume these interactions are indoors, unmasked, and
          undistanced.
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {header}
      <SelectControl
        id="interaction"
        label="Type of interaction"
        data={data}
        setter={setter}
        source={Interaction}
      />
      <SelectControl
        id="setting"
        label="Setting"
        data={data}
        setter={setter}
        source={Setting}
      />
      <SelectControl
        id="distance"
        label="Distance"
        data={data}
        setter={setter}
        source={Distance}
      />
      <div className="form-group">
        <label htmlFor="duration">Duration (in minutes)</label>
        <input
          className="form-control form-control-lg"
          type="number"
          value={data.duration}
          onChange={(e) =>
            setter({
              ...data,
              duration: parseInt(e.target.value),
            })
          }
        />
      </div>
      <SelectControl
        id="theirMask"
        label="Their mask"
        data={data}
        setter={setter}
        source={TheirMask}
      />
      <SelectControl
        id="yourMask"
        label="Your mask"
        data={data}
        setter={setter}
        source={YourMask}
      />
      <SelectControl
        id="voice"
        label="Volume of conversation"
        data={data}
        setter={setter}
        source={Voice}
      />

      <span className="readout">
        Activity Risk: If 1 person at this activity has COVID, then you have a{' '}
        <b>{((activityRisk || 0) * 100).toFixed(2)}%</b> chance of getting
        COVID.
        <p>
          <b>
            {activityRisk && activityRisk >= MAX_ACTIVITY_RISK
              ? ' NOTE: We have capped this number at the maximum Activity Risk.'
              : ''}
          </b>
        </p>
      </span>
    </React.Fragment>
  )
}
