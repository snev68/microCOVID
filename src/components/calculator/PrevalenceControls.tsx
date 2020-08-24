import React, { useState } from 'react'

import { CalculatorData, calculateLocationPersonAverage } from 'data/calculate'
import { Locations, PrevalenceDataDate } from 'data/location'

const PrevalenceField: React.FunctionComponent<{
  label: string
  value: string | number
  unit?: string
  setter: (newValue: string) => void
  inputType: string
  isEditable: boolean
}> = ({
  label,
  value,
  setter,
  unit,
  inputType,
  isEditable,
}): React.ReactElement => {
  let body: React.ReactElement
  if (isEditable) {
    body = (
      <input
        className="form-control form-control-lg"
        type={inputType}
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    )
    if (unit) {
      body = (
        <div className="input-group mb-3">
          {body}
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              %
            </span>
          </div>
        </div>
      )
    }
    body = (
      <div className="form-group">
        <label htmlFor="duration">{label}</label>
        {body}
      </div>
    )
  } else {
    body = (
      <p>
        {label}: {}
        <b>
          {value}
          {unit}
        </b>
      </p>
    )
  }

  return body
}

export const PrevalenceControls: React.FunctionComponent<{
  data: CalculatorData
  setter: (newData: CalculatorData) => void
}> = ({ data, setter }): React.ReactElement => {
  const locationGroups: { [key: string]: Array<string> } = {}
  for (const key in Locations) {
    const location = Locations[key]
    if (location.topLevelGroup !== null) {
      let members = locationGroups[location.topLevelGroup]
      if (members === undefined) {
        members = []
        locationGroups[location.topLevelGroup] = members
      }
      members.push(key)
    }
  }

  const [topLocation, setTopLocation] = useState('')
  const [subLocation, setSubLocation] = useState('')

  const setLocationData = (selectedValue: string) => {
    const locationData = Locations[selectedValue]

    if (locationData) {
      setter({
        ...data,
        location: selectedValue,
        population: locationData.population,
        casesPastWeek: locationData.casesPastWeek,
        casesIncreasingPercentage:
          Math.round(locationData.casesIncreasingPercentage * 10) / 10,
        positiveCasePercentage:
          Math.round(locationData.positiveCasePercentage * 10) / 10,
      })
    }

    if (selectedValue === '') {
      setter({
        ...data,
        location: selectedValue,
        population: '',
        casesPastWeek: 0,
        casesIncreasingPercentage: 0,
        positiveCasePercentage: 0,
      })
    }
  }

  let subPrompt: string
  if (topLocation.startsWith('US_')) {
    if (Locations[topLocation].label === 'Louisiana') {
      subPrompt = 'Entire state, or select parish...'
    } else if (Locations[topLocation].label === 'Alaska') {
      subPrompt = 'Entire state, or select borough...'
    } else {
      subPrompt = 'Entire state, or select county...'
    }
  } else {
    subPrompt = 'Entire country, or select region...'
  }

  const showSubLocation =
    topLocation !== '' && Locations[topLocation].subdivisions.length > 1

  return (
    <React.Fragment>
      <header id="location">Step 1 - Choose a location</header>
      <div className="form-group">
        <select
          className="form-control form-control-lg"
          value={topLocation}
          onChange={(e) => {
            setTopLocation(e.target.value)
            setSubLocation('')
            setLocationData(e.target.value)
          }}
        >
          <option value="">Select location or enter data...</option>
          {Object.keys(locationGroups).map((groupName, groupInd) => (
            <optgroup key={groupInd} label={groupName}>
              {locationGroups[groupName].map((locKey, locInd) => (
                <option key={locInd} value={locKey}>
                  {Locations[locKey].label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {!showSubLocation ? null : (
        <div className="form-group">
          <select
            className="form-control form-control-lg"
            value={subLocation}
            onChange={(e) => {
              setSubLocation(e.target.value)
              if (e.target.value === '') {
                setLocationData(topLocation)
              } else {
                setLocationData(e.target.value)
              }
            }}
          >
            <option value="">{subPrompt}</option>
            {Locations[topLocation].subdivisions.map((key, index) => (
              <option key={index} value={key}>
                {Locations[key].label}
              </option>
            ))}
          </select>
        </div>
      )}
      <PrevalenceField
        label="Reported cases in past week"
        value={data.casesPastWeek.toString()}
        setter={(value) => setter({ ...data, casesPastWeek: parseInt(value) })}
        inputType="number"
        isEditable={topLocation === ''}
      />
      <PrevalenceField
        label="Per how many people?"
        value={data.population}
        setter={(value) => setter({ ...data, population: value })}
        inputType="text"
        isEditable={topLocation === ''}
      />
      {topLocation !== '' && data.casesIncreasingPercentage === 0 ? (
        <p>Cases are stable or decreasing.</p>
      ) : (
        <PrevalenceField
          label="Percent increase in cases from last week to this week"
          value={data.casesIncreasingPercentage}
          unit="%"
          setter={(value) =>
            setter({ ...data, casesIncreasingPercentage: Number(value) })
          }
          inputType="number"
          isEditable={topLocation === ''}
        />
      )}
      <PrevalenceField
        label="Percent of tests that come back positive"
        value={data.positiveCasePercentage.toString()}
        unit="%"
        setter={(value) =>
          setter({ ...data, positiveCasePercentage: Number(value) })
        }
        inputType="number"
        isEditable={topLocation === ''}
      />
      <p>
        Local person risk: {}
        <b>{Math.round(calculateLocationPersonAverage(data) || 0)} µCoV</b>
      </p>
      {topLocation === '' ? null : (
        <div>
          <p>
            Prevalence data consolidated from {}
            <a href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data">
              Johns Hopkins CSSE
            </a>{' '}
            (reported cases), {}
            <a href="https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md">
              Covid Act Now
            </a>{' '}
            (US positive test rates), and {}
            <a href="https://ourworldindata.org/coronavirus-testing#testing-for-covid-19-background-the-our-world-in-data-covid-19-testing-dataset">
              Our World in Data
            </a>{' '}
            (international positive test rates).
          </p>
          <p>
            If test positivity data for a region is not available, it will be
            displayed as 20%.
          </p>
          <p>Data last updated {PrevalenceDataDate}.</p>
        </div>
      )}
    </React.Fragment>
  )
}
