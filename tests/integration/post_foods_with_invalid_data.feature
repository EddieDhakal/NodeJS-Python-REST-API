Feature: Foods posted with invalid data
  Posting malformed JSON requests with missing key fields or
  invalid content type should notify me with errors.

  Scenario Outline: Invalid Data
    Given I want to get a summarised list of special foods
     When posted "requests/<bad request file>"
     Then I should get a bad request error
      And error message as in "responses/<error response file>"

    Examples: Malformed Request Data
      | bad request file              | error response file           |
      | malformed_request_data.json   | parse_error.json              |

    Examples: Missing key fields
      | bad request file              | error response file           |
      | title_with_typo.json          | missing_title.json            |
      | missing_image.json            | missing_image.json            |
      | slug_with_typo.json           | missing_slug.json             |
      | missing_multiple_fields.json  | missing_multiple_fields.json  |
