export interface RamadanDay {
  day: number;
  date: string;
  weekday: string;
  hanafiS: string;
  hanafiI: string;
  jafriS: string;
  jafriI: string;
}

export interface CityData {
  name: string;
  data: RamadanDay[];
}

export const citiesData: Record<string, CityData> = {
  wahi: {
    name: 'WAHI PANDHI',
    data: [
      { day: 1, date: '19 Feb', weekday: 'Thu', hanafiS: '05:44', hanafiI: '06:24', jafriS: '05:34', jafriI: '06:34' },
      { day: 2, date: '20 Feb', weekday: 'Fri', hanafiS: '05:44', hanafiI: '06:24', jafriS: '05:34', jafriI: '06:34' },
      { day: 3, date: '21 Feb', weekday: 'Sat', hanafiS: '05:43', hanafiI: '06:25', jafriS: '05:33', jafriI: '06:35' },
      { day: 4, date: '22 Feb', weekday: 'Sun', hanafiS: '05:42', hanafiI: '06:25', jafriS: '05:32', jafriI: '06:36' },
      { day: 5, date: '23 Feb', weekday: 'Mon', hanafiS: '05:41', hanafiI: '06:26', jafriS: '05:31', jafriI: '06:36' },
      { day: 6, date: '24 Feb', weekday: 'Tue', hanafiS: '05:40', hanafiI: '06:27', jafriS: '05:30', jafriI: '06:37' },
      { day: 7, date: '25 Feb', weekday: 'Wed', hanafiS: '05:39', hanafiI: '06:27', jafriS: '05:29', jafriI: '06:38' },
      { day: 8, date: '26 Feb', weekday: 'Thu', hanafiS: '05:39', hanafiI: '06:28', jafriS: '05:29', jafriI: '06:38' },
      { day: 9, date: '27 Feb', weekday: 'Fri', hanafiS: '05:38', hanafiI: '06:28', jafriS: '05:28', jafriI: '06:39' },
      { day: 10, date: '28 Feb', weekday: 'Sat', hanafiS: '05:37', hanafiI: '06:29', jafriS: '05:27', jafriI: '06:40' },
      { day: 11, date: '1 Mar', weekday: 'Sun', hanafiS: '05:36', hanafiI: '06:30', jafriS: '05:26', jafriI: '06:41' },
      { day: 12, date: '2 Mar', weekday: 'Mon', hanafiS: '05:35', hanafiI: '06:30', jafriS: '05:25', jafriI: '06:41' },
      { day: 13, date: '3 Mar', weekday: 'Tue', hanafiS: '05:34', hanafiI: '06:31', jafriS: '05:24', jafriI: '06:42' },
      { day: 14, date: '4 Mar', weekday: 'Wed', hanafiS: '05:33', hanafiI: '06:31', jafriS: '05:23', jafriI: '06:42' },
      { day: 15, date: '5 Mar', weekday: 'Thu', hanafiS: '05:32', hanafiI: '06:32', jafriS: '05:22', jafriI: '06:43' },
      { day: 16, date: '6 Mar', weekday: 'Fri', hanafiS: '05:31', hanafiI: '06:32', jafriS: '05:21', jafriI: '06:43' },
      { day: 17, date: '7 Mar', weekday: 'Sat', hanafiS: '05:30', hanafiI: '06:33', jafriS: '05:20', jafriI: '06:44' },
      { day: 18, date: '8 Mar', weekday: 'Sun', hanafiS: '05:29', hanafiI: '06:34', jafriS: '05:19', jafriI: '06:44' },
      { day: 19, date: '9 Mar', weekday: 'Mon', hanafiS: '05:28', hanafiI: '06:34', jafriS: '05:18', jafriI: '06:45' },
      { day: 20, date: '10 Mar', weekday: 'Tue', hanafiS: '05:27', hanafiI: '06:35', jafriS: '05:17', jafriI: '06:45' },
      { day: 21, date: '11 Mar', weekday: 'Wed', hanafiS: '05:26', hanafiI: '06:35', jafriS: '05:16', jafriI: '06:46' },
      { day: 22, date: '12 Mar', weekday: 'Thu', hanafiS: '05:25', hanafiI: '06:36', jafriS: '05:15', jafriI: '06:46' },
      { day: 23, date: '13 Mar', weekday: 'Fri', hanafiS: '05:24', hanafiI: '06:36', jafriS: '05:14', jafriI: '06:47' },
      { day: 24, date: '14 Mar', weekday: 'Sat', hanafiS: '05:23', hanafiI: '06:37', jafriS: '05:13', jafriI: '06:47' },
      { day: 25, date: '15 Mar', weekday: 'Sun', hanafiS: '05:22', hanafiI: '06:37', jafriS: '05:12', jafriI: '06:48' },
      { day: 26, date: '16 Mar', weekday: 'Mon', hanafiS: '05:21', hanafiI: '06:38', jafriS: '05:11', jafriI: '06:48' },
      { day: 27, date: '17 Mar', weekday: 'Tue', hanafiS: '05:19', hanafiI: '06:38', jafriS: '05:09', jafriI: '06:49' },
      { day: 28, date: '18 Mar', weekday: 'Wed', hanafiS: '05:18', hanafiI: '06:39', jafriS: '05:08', jafriI: '06:49' },
      { day: 29, date: '19 Mar', weekday: 'Thu', hanafiS: '05:17', hanafiI: '06:39', jafriS: '05:07', jafriI: '06:50' },
      { day: 30, date: '20 Mar', weekday: 'Fri', hanafiS: '05:16', hanafiI: '06:40', jafriS: '05:06', jafriI: '06:50' }
    ]
  },
  hyderabad: {
    name: 'HYDERABAD',
    data: [
      { day: 1, date: '19 Feb', weekday: 'Thu', hanafiS: '05:41', hanafiI: '06:24', jafriS: '05:31', jafriI: '06:34' },
      { day: 2, date: '20 Feb', weekday: 'Fri', hanafiS: '05:40', hanafiI: '06:24', jafriS: '05:30', jafriI: '06:34' },
      { day: 3, date: '21 Feb', weekday: 'Sat', hanafiS: '05:39', hanafiI: '06:25', jafriS: '05:29', jafriI: '06:35' },
      { day: 4, date: '22 Feb', weekday: 'Sun', hanafiS: '05:38', hanafiI: '06:25', jafriS: '05:28', jafriI: '06:35' },
      { day: 5, date: '23 Feb', weekday: 'Mon', hanafiS: '05:38', hanafiI: '06:26', jafriS: '05:28', jafriI: '06:36' },
      { day: 6, date: '24 Feb', weekday: 'Tue', hanafiS: '05:37', hanafiI: '06:27', jafriS: '05:27', jafriI: '06:37' },
      { day: 7, date: '25 Feb', weekday: 'Wed', hanafiS: '05:36', hanafiI: '06:27', jafriS: '05:26', jafriI: '06:37' },
      { day: 8, date: '26 Feb', weekday: 'Thu', hanafiS: '05:35', hanafiI: '06:28', jafriS: '05:25', jafriI: '06:38' },
      { day: 9, date: '27 Feb', weekday: 'Fri', hanafiS: '05:34', hanafiI: '06:28', jafriS: '05:24', jafriI: '06:39' },
      { day: 10, date: '28 Feb', weekday: 'Sat', hanafiS: '05:33', hanafiI: '06:29', jafriS: '05:23', jafriI: '06:40' },
      { day: 11, date: '1 Mar', weekday: 'Sun', hanafiS: '05:33', hanafiI: '06:29', jafriS: '05:23', jafriI: '06:40' },
      { day: 12, date: '2 Mar', weekday: 'Mon', hanafiS: '05:32', hanafiI: '06:30', jafriS: '05:22', jafriI: '06:41' },
      { day: 13, date: '3 Mar', weekday: 'Tue', hanafiS: '05:31', hanafiI: '06:30', jafriS: '05:21', jafriI: '06:41' },
      { day: 14, date: '4 Mar', weekday: 'Wed', hanafiS: '05:30', hanafiI: '06:31', jafriS: '05:20', jafriI: '06:42' },
      { day: 15, date: '5 Mar', weekday: 'Thu', hanafiS: '05:29', hanafiI: '06:31', jafriS: '05:19', jafriI: '06:42' },
      { day: 16, date: '6 Mar', weekday: 'Fri', hanafiS: '05:28', hanafiI: '06:32', jafriS: '05:18', jafriI: '06:43' },
      { day: 17, date: '7 Mar', weekday: 'Sat', hanafiS: '05:27', hanafiI: '06:32', jafriS: '05:17', jafriI: '06:43' },
      { day: 18, date: '8 Mar', weekday: 'Sun', hanafiS: '05:26', hanafiI: '06:33', jafriS: '05:16', jafriI: '06:44' },
      { day: 19, date: '9 Mar', weekday: 'Mon', hanafiS: '05:25', hanafiI: '06:33', jafriS: '05:15', jafriI: '06:44' },
      { day: 20, date: '10 Mar', weekday: 'Tue', hanafiS: '05:24', hanafiI: '06:34', jafriS: '05:14', jafriI: '06:45' },
      { day: 21, date: '11 Mar', weekday: 'Wed', hanafiS: '05:23', hanafiI: '06:34', jafriS: '05:13', jafriI: '06:45' },
      { day: 22, date: '12 Mar', weekday: 'Thu', hanafiS: '05:22', hanafiI: '06:35', jafriS: '05:12', jafriI: '06:46' },
      { day: 23, date: '13 Mar', weekday: 'Fri', hanafiS: '05:21', hanafiI: '06:35', jafriS: '05:11', jafriI: '06:46' },
      { day: 24, date: '14 Mar', weekday: 'Sat', hanafiS: '05:20', hanafiI: '06:36', jafriS: '05:10', jafriI: '06:47' },
      { day: 25, date: '15 Mar', weekday: 'Sun', hanafiS: '05:19', hanafiI: '06:36', jafriS: '05:09', jafriI: '06:47' },
      { day: 26, date: '16 Mar', weekday: 'Mon', hanafiS: '05:18', hanafiI: '06:37', jafriS: '05:08', jafriI: '06:48' },
      { day: 27, date: '17 Mar', weekday: 'Tue', hanafiS: '05:17', hanafiI: '06:37', jafriS: '05:07', jafriI: '06:49' },
      { day: 28, date: '18 Mar', weekday: 'Wed', hanafiS: '05:16', hanafiI: '06:38', jafriS: '05:06', jafriI: '06:49' },
      { day: 29, date: '19 Mar', weekday: 'Thu', hanafiS: '05:15', hanafiI: '06:38', jafriS: '05:05', jafriI: '06:50' },
      { day: 30, date: '20 Mar', weekday: 'Fri', hanafiS: '05:14', hanafiI: '06:39', jafriS: '05:04', jafriI: '06:50' }
    ]
  },
  lakhra: {
    name: 'LAKHRA MINE',
    data: [
      { day: 1, date: '19 Feb', weekday: 'Thu', hanafiS: '05:43', hanafiI: '06:25', jafriS: '05:33', jafriI: '06:35' },
      { day: 2, date: '20 Feb', weekday: 'Fri', hanafiS: '05:42', hanafiI: '06:25', jafriS: '05:32', jafriI: '06:36' },
      { day: 3, date: '21 Feb', weekday: 'Sat', hanafiS: '05:41', hanafiI: '06:26', jafriS: '05:31', jafriI: '06:37' },
      { day: 4, date: '22 Feb', weekday: 'Sun', hanafiS: '05:40', hanafiI: '06:26', jafriS: '05:30', jafriI: '06:37' },
      { day: 5, date: '23 Feb', weekday: 'Mon', hanafiS: '05:39', hanafiI: '06:27', jafriS: '05:29', jafriI: '06:38' },
      { day: 6, date: '24 Feb', weekday: 'Tue', hanafiS: '05:38', hanafiI: '06:27', jafriS: '05:28', jafriI: '06:39' },
      { day: 7, date: '25 Feb', weekday: 'Wed', hanafiS: '05:37', hanafiI: '06:28', jafriS: '05:27', jafriI: '06:40' },
      { day: 8, date: '26 Feb', weekday: 'Thu', hanafiS: '05:36', hanafiI: '06:28', jafriS: '05:26', jafriI: '06:40' },
      { day: 9, date: '27 Feb', weekday: 'Fri', hanafiS: '05:35', hanafiI: '06:29', jafriS: '05:25', jafriI: '06:41' },
      { day: 10, date: '28 Feb', weekday: 'Sat', hanafiS: '05:34', hanafiI: '06:29', jafriS: '05:24', jafriI: '06:42' },
      { day: 11, date: '1 Mar', weekday: 'Sun', hanafiS: '05:33', hanafiI: '06:30', jafriS: '05:23', jafriI: '06:42' },
      { day: 12, date: '2 Mar', weekday: 'Mon', hanafiS: '05:32', hanafiI: '06:30', jafriS: '05:22', jafriI: '06:43' },
      { day: 13, date: '3 Mar', weekday: 'Tue', hanafiS: '05:31', hanafiI: '06:31', jafriS: '05:21', jafriI: '06:44' },
      { day: 14, date: '4 Mar', weekday: 'Wed', hanafiS: '05:30', hanafiI: '06:31', jafriS: '05:20', jafriI: '06:44' },
      { day: 15, date: '5 Mar', weekday: 'Thu', hanafiS: '05:29', hanafiI: '06:32', jafriS: '05:19', jafriI: '06:45' },
      { day: 16, date: '6 Mar', weekday: 'Fri', hanafiS: '05:28', hanafiI: '06:32', jafriS: '05:18', jafriI: '06:46' },
      { day: 17, date: '7 Mar', weekday: 'Sat', hanafiS: '05:27', hanafiI: '06:33', jafriS: '05:17', jafriI: '06:46' },
      { day: 18, date: '8 Mar', weekday: 'Sun', hanafiS: '05:26', hanafiI: '06:34', jafriS: '05:16', jafriI: '06:47' },
      { day: 19, date: '9 Mar', weekday: 'Mon', hanafiS: '05:25', hanafiI: '06:34', jafriS: '05:15', jafriI: '06:48' },
      { day: 20, date: '10 Mar', weekday: 'Tue', hanafiS: '05:24', hanafiI: '06:35', jafriS: '05:14', jafriI: '06:48' },
      { day: 21, date: '11 Mar', weekday: 'Wed', hanafiS: '05:23', hanafiI: '06:35', jafriS: '05:13', jafriI: '06:49' },
      { day: 22, date: '12 Mar', weekday: 'Thu', hanafiS: '05:22', hanafiI: '06:36', jafriS: '05:12', jafriI: '06:50' },
      { day: 23, date: '13 Mar', weekday: 'Fri', hanafiS: '05:21', hanafiI: '06:36', jafriS: '05:11', jafriI: '06:50' },
      { day: 24, date: '14 Mar', weekday: 'Sat', hanafiS: '05:20', hanafiI: '06:37', jafriS: '05:10', jafriI: '06:51' },
      { day: 25, date: '15 Mar', weekday: 'Sun', hanafiS: '05:19', hanafiI: '06:37', jafriS: '05:09', jafriI: '06:52' },
      { day: 26, date: '16 Mar', weekday: 'Mon', hanafiS: '05:18', hanafiI: '06:38', jafriS: '05:08', jafriI: '06:52' },
      { day: 27, date: '17 Mar', weekday: 'Tue', hanafiS: '05:17', hanafiI: '06:38', jafriS: '05:07', jafriI: '06:53' },
      { day: 28, date: '18 Mar', weekday: 'Wed', hanafiS: '05:16', hanafiI: '06:39', jafriS: '05:06', jafriI: '06:54' },
      { day: 29, date: '19 Mar', weekday: 'Thu', hanafiS: '05:15', hanafiI: '06:39', jafriS: '05:05', jafriI: '06:54' },
      { day: 30, date: '20 Mar', weekday: 'Fri', hanafiS: '05:14', hanafiI: '06:40', jafriS: '05:04', jafriI: '06:55' }
    ]
  }
};
