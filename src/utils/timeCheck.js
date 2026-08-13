export const fetchServerTime = async () => {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return new Date(data.datetime).getTime();
  } catch (error) {
    console.warn("Primary time API failed, trying backup...", error);
    try {
      const response2 = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta');
      if (!response2.ok) throw new Error('Backup API Error');
      const data2 = await response2.json();
      return new Date(data2.dateTime).getTime();
    } catch (error2) {
      console.error("All time APIs failed. Using strict 0 to prevent manipulation.");
      // MUST NOT fallback to local time to prevent user manipulation.
      // Returning 0 (Jan 1 1970) ensures the countdown never opens if offline.
      return 0;
    }
  }
};

export const TARGET_DATE = new Date('2026-08-17T11:20:00+07:00').getTime(); // 17 Aug 2026, 11:20 WIB
