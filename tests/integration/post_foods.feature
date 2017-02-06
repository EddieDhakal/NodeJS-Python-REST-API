Feature: Post Foods
  In order to get a summary of special foods with Chilli,
  I want to post a raw list of foods and
  get a summary list of special foods with chilli.

  Scenario: Post foods list with a valid request data and a valid content type
    Given I want to get a summarised list of special foods
     When posted "requests/good_request.json"
     Then I should get a good request acknowledgement
      And parsed foods as in "responses/parsed_foods.json"
