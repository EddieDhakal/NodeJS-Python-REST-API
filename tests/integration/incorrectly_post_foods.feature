Feature: Incorrectly Posted Foods
  As a careless API user I am posting a good list of foods but without
  thinking about the content type of what I am posting.

  Scenario: Post valid foods list with unknown data format
    Given I am posting some data without explicitly setting request data format
     When posted "requests/good_request.json"
     Then I should get a bad request error
      And error message as in "responses/unknown_request_content_type.json"


  Scenario Outline: Valid data sent with unsupported content format
    Given I am posting some data with data format "<content format>"
     When posted "requests/good_request.json"
     Then I should get a bad request error
      And error message as in "responses/<error unknown content type>"

    Examples: Unsupported Content Types
      | content format  | error unknown content type         |
      | image/png       | unknown_request_content_type.json  |
      | application/pdf | unknown_request_content_type.json  |
      | text/html       | unknown_request_content_type.json  |
