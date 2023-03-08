const https = require('https');
const querystring = require('querystring');
const parseString = require('xml2js').parseString;

const upsAccessKey = 'FDCDA7F0602CCF72';
const upsUserId = 'boutiquecaoba';
const upsPassword = 'Greetings.01';

const postData = querystring.stringify({
  'RatingServiceSelectionRequest': {
    'Request': {
      'TransactionReference': {
        'CustomerContext': 'Rating and Service'
      },
      'RequestAction': 'Rate',
      'RequestOption': 'Shop'
    },
    'PickupType': {
      'Code': '01',
      'Description': 'Daily Pickup'
    },
    'Shipment': {
      'Shipper': {
        'Address': {
          'City': 'Los Angeles',
          'StateProvinceCode': 'CA',
          'PostalCode': '90001',
          'CountryCode': 'US'
        }
      },
      'ShipTo': {
        'Address': {
          'City': 'New York',
          'StateProvinceCode': 'NY',
          'PostalCode': '10001',
          'CountryCode': 'US'
        }
      },
      'ShipFrom': {
        'Address': {
          'City': 'Los Angeles',
          'StateProvinceCode': 'CA',
          'PostalCode': '90001',
          'CountryCode': 'US'
        }
      },
      'Service': {
        'Code': '03',
        'Description': 'Ground Service'
      },
      'Package': {
        'PackagingType': {
          'Code': '02',
          'Description': 'Package'
        },
        'Dimensions': {
          'UnitOfMeasurement': {
            'Code': 'IN',
            'Description': 'Inches'
          },
          'Length': '10',
          'Width': '8',
          'Height': '4'
        },
        'PackageWeight': {
          'UnitOfMeasurement': {
            'Code': 'LBS',
            'Description': 'Pounds'
          },
          'Weight': '5'
        }
      }
    }
  }
});

const options = {
  hostname: 'onlinetools.ups.com',
  path: '/ups.app/xml/Rate',
  method: 'POST',
  headers: {
    'AccessLicenseNumber': upsAccessKey,
    'Username': upsUserId,
    'Password': upsPassword,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    parseString(data, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const serviceOptions = result.RatingServiceSelectionResponse.RatedShipment;
        console.log('Available Shipping Options:');
        for (let i = 0; i < serviceOptions.length; i++) {
          console.log(`Service Code: ${serviceOptions[i].Service.Code}, Description: ${serviceOptions[i].Service.Description}, Total Charges: ${serviceOptions[i].TotalCharges.CurrencyCode} ${serviceOptions[i].TotalCharges.MonetaryValue}`);
        }
      }
    });
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(postData);
req.end();
