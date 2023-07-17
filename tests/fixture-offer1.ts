export const validOffer = {
  query: {
    pubid: '1',
    appid: 1,
    country: '',
    platform: 'all',
  },
  response: {
    currency_name: 'Coins',
    offers_count: 2729,
    offers: [
      {
        offer_id: '19524555',
        offer_name: 'MyGym - iOS',
        offer_desc: 'Play and reach level 23 within 14 days.',
        call_to_action: 'Play and reach level 23 within 14 days.',
        disclaimer: 'This offer rewards within 24 hours. New users only.',
        offer_url: 'https://some.url',
        offer_url_easy: 'https://some.url',
        payout: 10.675,
        payout_type: 'cpe',
        amount: 8873,
        image_url: 'https://some.url',
        image_url_220x124: 'https://some.url',
        countries: ['NZ'],
        platform: 'mobile',
        device: 'iphone_ipad',
        category: {
          '9': 'Mobile Apps',
        },
        last_modified: 1645095666,
        preview_url: 'https://some.url',
        package_id: 'idnumbers',
        verticals: [
          {
            vertical_id: '4',
            vertical_name: 'Lifestyle',
          },
          {
            vertical_id: '11',
            vertical_name: 'Health',
          },
        ],
      },
    ],
  },
};

/**
 * Missing the requirements mapping field 'call_to_action'
 */
export const invalidOffer = {
  query: {
    pubid: '1',
    appid: 1,
    country: '',
    platform: 'all',
  },
  response: {
    currency_name: 'Coins',
    offers_count: 2729,
    offers: [
      {
        offer_id: '19524555',
        offer_name: 'MyGym - iOS',
        offer_desc: 'Play and reach level 23 within 14 days.',
        disclaimer: 'This offer rewards within 24 hours. New users only.',
        offer_url: 'https://some.url',
        offer_url_easy: 'https://some.url',
        payout: 10.675,
        payout_type: 'cpe',
        amount: 8873,
        image_url: 'https://some.url',
        image_url_220x124: 'https://some.url',
        countries: ['NZ'],
        platform: 'mobile',
        device: 'iphone_ipad',
        category: {
          '9': 'Mobile Apps',
        },
        last_modified: 1645095666,
        preview_url: 'https://some.url',
        package_id: 'idnumbers',
        verticals: [
          {
            vertical_id: '4',
            vertical_name: 'Lifestyle',
          },
          {
            vertical_id: '11',
            vertical_name: 'Health',
          },
        ],
      },
    ],
  },
};
