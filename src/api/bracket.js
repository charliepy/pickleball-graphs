import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useBracketStore = defineStore(
  'bracketStore',
  () => {
    const stateIds = {
      Alabama: 3919,
      Alaska: 3920,
      Arizona: 3921,
      Arkansas: 3922,
      California: 3924,
      Colorado: 3926,
      Connecticut: 3927,
      Delaware: 3928,
      Florida: 3930,
      Georgia: 3931,
      Hawaii: 3932,
      Idaho: 3933,
      Illinois: 3934,
      Indiana: 3935,
      Iowa: 3936,
      Kansas: 3937,
      Kentucky: 3938,
      Louisiana: 3939,
      Maine: 3941,
      Maryland: 3942,
      Massachusetts: 3943,
      Michigan: 3945,
      Minnesota: 3946,
      Mississippi: 3947,
      Missouri: 3948,
      Montana: 3949,
      Nebraska: 3950,
      Nevada: 3951,
      'New Hampshire': 3952,
      'New Jersey': 3953,
      'New Mexico': 3955,
      'New York': 3956,
      'North Carolina': 3957,
      'North Dakota': 3958,
      Ohio: 3959,
      Oklahoma: 3960,
      Oregon: 3962,
      Pennsylvania: 3963,
      'Rhode Island': 3965,
      'South Carolina': 3966,
      'South Dakota': 3967,
      Tennessee: 3969,
      Texas: 3970,
      Utah: 3972,
      Vermont: 3973,
      Virginia: 3974,
      Washington: 3975,
      'West Virginia': 3976,
      Wisconsin: 3977,
      Wyoming: 3978,
    };

    const savedStates = ref([]);
    const savedResult = ref([]);

    const getStateNames = () => {
      return Object.keys(stateIds);
    };

    const getSavedStates = () => {
      return savedStates.value;
    };

    const getSavedResult = () => {
      return savedResult.value;
    };

    const postEventSearch = async (states) => {
      savedStates.value = states;

      const ids = states.map((item) => {
        return stateIds[item];
      });

      const payload = {
        ReturnType: 'json',
        EventTypeIDs: '1',
        ClubID: '',
        CountryID: '231',
        StateIDs: ids.toString(),
        SportIDs: 'dc1894c6-7e85-43bc-bfa2-3993b0dd630f',
        PlayerGroupIDs: '',
        FormatIDs: '',
        AgeIDs: '',
        RankIDs: '',
        DateFilter: 'future',
        FromDate: '',
        ToDate: '',
        ShowOnCalendar: '0',
        IncludeTestEvents: '0',
        SearchWord: '',
        PrizeMoney: 'All',
        PageNumber: '1',
        PageSize: 500,
        OrderBy: 'EventActivityFirstDate',
        OrderDirection: 'Asc',
        Alpha: 'All',
        prt: '',
      };

      try {
        const response = await axios.post(
          'https://pickleballbrackets.com/Json.asmx/EventsSearch_PublicUI',
          payload,
        );

        const eventList = response.data.d;
        savedResult.value = eventList;
        return eventList;
      } catch (e) {
        console.error(e);
        return [];
      }
    };

    return {
      savedStates,
      savedResult,
      getStateNames,
      getSavedStates,
      getSavedResult,
      postEventSearch,
    };
  },
  {
    persist: true,
  },
);

// Hot Module replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBracketStore, import.meta.hot));
}
