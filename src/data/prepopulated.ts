import { CalculatorData } from './calculate'

export type PartialData = Omit<
  CalculatorData,
  | 'location'
  | 'population'
  | 'casesPastWeek'
  | 'casesIncreasingPercentage'
  | 'positiveCasePercentage'
>

export const prepopulated: {
  [key: string]: PartialData
} = {
  'Outdoor masked hangout with 2 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'masked',
    yourMask: 'masked',
    voice: 'normal',
  },

  'Indoor unmasked hangout with 2 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 2,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  'Car ride with 1 person for 15 mins': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'indoor',
    distance: 'normal',
    duration: 15,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  'Physically intimate with person': {
    riskProfile: 'average',
    interaction: 'partner',
    personCount: 1,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  'Grocery store for 60 minutes': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 5,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 60,
    theirMask: 'none',
    yourMask: 'masked',
    voice: 'silent',
  },

  'Plane ride': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 20,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 360,
    theirMask: 'masked',
    yourMask: 'masked',
    voice: 'silent',
  },

  'Eating in restaurant, outdoors': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'outdoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  'Eating in restaurant, indoors': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 90,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  'Going to bar': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 15,

    setting: 'indoor',
    distance: 'sixFt',
    duration: 180,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'loud',
  },

  'Large outdoor party: masked with 250 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 250,

    setting: 'outdoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'masked',
    yourMask: 'masked',
    voice: 'normal',
  },

  'Small indoor party: unmasked with 25 people': {
    riskProfile: 'average',
    interaction: 'oneTime',
    personCount: 25,

    setting: 'indoor',
    distance: 'normal',
    duration: 180,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },

  'Outdoor, masked hangout with person who has COVID': {
    riskProfile: 'hasCovid',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'outdoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'masked',
    yourMask: 'masked',
    voice: 'normal',
  },

  'Indoor, unmasked hangout with person who has COVID': {
    riskProfile: 'hasCovid',
    interaction: 'oneTime',
    personCount: 1,

    setting: 'indoor',
    distance: 'normal',
    duration: 60,
    theirMask: 'none',
    yourMask: 'none',
    voice: 'normal',
  },
}
