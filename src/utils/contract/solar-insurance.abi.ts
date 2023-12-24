export const SolarInsuranceABI = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"year","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"insuredHours","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recordedHours","type":"uint256"}],"name":"ClaimAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"year","type":"uint256"}],"name":"ClaimFiled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"year","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"insuredHours","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recordedHours","type":"uint256"}],"name":"ClaimRefused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"ContractFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"year","type":"uint256"}],"name":"DemoClaimFiled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"}],"name":"PolicyDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"PolicyExtended","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"string","name":"riskLevel","type":"string"},{"indexed":false,"internalType":"uint256","name":"panelArea","type":"uint256"},{"indexed":false,"internalType":"string","name":"location","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"PolicyRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"string","name":"riskLevel","type":"string"},{"indexed":false,"internalType":"uint256","name":"panelArea","type":"uint256"}],"name":"PremiumCalculated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"year","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"},{"indexed":false,"internalType":"string","name":"region","type":"string"}],"name":"SunshineDurationRecorded","type":"event"},{"inputs":[{"internalType":"enum SolarInsurance.InsuredRiskLevels","name":"riskLevel","type":"uint8"},{"internalType":"uint256","name":"panelArea","type":"uint256"}],"name":"calculatePremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"year","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"enum SolarInsurance.SwissRegion","name":"region","type":"uint8"}],"name":"createSunshineRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deletePolicy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extendPolicy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"year","type":"uint256"}],"name":"fileClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"year","type":"uint256"}],"name":"fileClaimWithoutChecks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fundContract","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"enum SolarInsurance.InsuredRiskLevels","name":"riskLevel","type":"uint8"}],"name":"getInsuredRiskByKey","outputs":[{"components":[{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"insuredHours","type":"uint256"}],"internalType":"struct SolarInsurance.InsuranceLevel","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuredRiskOfPolicy","outputs":[{"components":[{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"insuredHours","type":"uint256"}],"internalType":"struct SolarInsurance.InsuranceLevel","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPolicyInformation","outputs":[{"components":[{"internalType":"address","name":"client","type":"address"},{"internalType":"enum SolarInsurance.SwissRegion","name":"panelLocation","type":"uint8"},{"internalType":"string","name":"locationName","type":"string"},{"internalType":"enum SolarInsurance.InsuredRiskLevels","name":"riskLevel","type":"uint8"},{"internalType":"string","name":"riskName","type":"string"},{"internalType":"uint256","name":"panelArea","type":"uint256"},{"internalType":"uint256","name":"premiumToPay","type":"uint256"},{"internalType":"uint256","name":"registrationDate","type":"uint256"},{"internalType":"uint256","name":"validUntil","type":"uint256"},{"internalType":"uint256","name":"claimTimeout","type":"uint256"}],"internalType":"struct SolarInsurance.SolarInsurancePolicy","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRelevantSunshineRecords","outputs":[{"components":[{"internalType":"enum SolarInsurance.SwissRegion","name":"region","type":"uint8"},{"internalType":"string","name":"regionName","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"},{"internalType":"uint256","name":"sunshineDuration","type":"uint256"}],"internalType":"struct SolarInsurance.SunshineRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRelevantSunshineRecordsWithoutChecks","outputs":[{"components":[{"internalType":"enum SolarInsurance.SwissRegion","name":"region","type":"uint8"},{"internalType":"string","name":"regionName","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"},{"internalType":"uint256","name":"sunshineDuration","type":"uint256"}],"internalType":"struct SolarInsurance.SunshineRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum SolarInsurance.InsuredRiskLevels","name":"riskLevel","type":"uint8"},{"internalType":"uint256","name":"panelArea","type":"uint256"},{"internalType":"enum SolarInsurance.SwissRegion","name":"location","type":"uint8"}],"name":"registerPolicy","outputs":[],"stateMutability":"payable","type":"function"}]');