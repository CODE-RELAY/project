pragma solidity ^0.5.0;

contract MainContract {
	
	// Document storage struct
	struct Submission {
        address index;
        address owner;
        uint status;
        address[] reviewers;
        uint[] marks;
        uint rating;
        uint cost;
    }
  
    // Document structs are mapped to hash values
    mapping(string => Submission) private submissions;
    string[] public hashes;

    mapping(address => uint) private credibility;

    // Function to check if a document is already present
    function isPresent(string memory docHash) public view returns(bool)
    {
        return (submissions[docHash].status == 0);
    }

    // Function to insert a document in mapping
    function newSubmission(address userAddress, string memory docHash) public 
    {
        // require(!isPresent(docHash), "Document already present");
        hashes.push(docHash);
        submissions[docHash].index = userAddress;
        submissions[docHash].owner = userAddress;
        submissions[docHash].cost = 0;
        submissions[docHash].status = 1;
        submissions[docHash].rating = 0;
    }

    function isAuthor(address userAddress, string memory h) public view returns(bool)
    {
        if (submissions[h].index == userAddress) 
        {
            return true;
        }
        return false;
    }


    // Function to check if given address is owner of document
    function isOwner(address userAddress, string memory h) public view returns(bool)
    {
        if (submissions[h].owner == userAddress) 
        {
            return true;
        }
        return false;
    }

    function getAuthor(string memory h) public view returns(address) {
        return submissions[h].index;
    }

    function changeOwnership(address org, string memory h) public
    {
        require(submissions[h].owner != org);
        submissions[h].owner = org;
    }

    // Function to return hash value of document
    function displayHash(uint num) public view returns(string memory)
    {
        return hashes[num];
    }

    // Function to return status of document
    function displaySubmissionStatus(string memory docHash) public view returns(uint status)
    {
        return submissions[docHash].status;
    }

    function setStatus(string memory docHash, uint s) public {
        submissions[docHash].status = s;
    }

    // Function to return count of uploaded documents
    function displayDocCount() public view returns(uint)
    {
        return hashes.length;
    }
        
    // Function to upvote a document by reviewer
    function Review(string memory docHash, address reviewer) public
    {
        require(!isReviewed(docHash), "Reviewing have been closed");
        require(!hasReviewed(docHash, reviewer), "You have already reviewed this submission");
        submissions[docHash].reviewers.push(reviewer);
        // submissions[docHash].marks.push(m);

    }

    function giveMarks(string memory docHash, uint m) public
    {
        submissions[docHash].marks.push(m);
    }

    function getCredibility(address reviewer) public view returns(uint) 
    {
        return credibility[reviewer];
    }

    function setCredibility(address reviewer, uint c) public
    {
        credibility[reviewer] = c;
    }

    // Function to check if a reviewer has already voted for a document
    function hasReviewed(string memory docHash, address addr) public view returns(bool)
    {
        for(uint i = 0;i < submissions[docHash].reviewers.length;i++)
        {
            if(submissions[docHash].reviewers[i] == addr)
            {
                return true;
            }
        }
        return false;
    }
    
    // Function to check if a document has been approved/disapproved
    function isReviewed(string memory docHash) public view returns (bool)
    {
        return (submissions[docHash].reviewers.length >= 5);
    }
    
    // Function to get number of upvotes
    function getCount(string memory docHash) public view returns(uint)
    {
        return (submissions[docHash].reviewers.length);
    }

    function setRating(uint r, string memory docHash) public 
    {
        require(r >= 0 && r <= 10, "Invalid Rating");
        submissions[docHash].rating = r;
    }

    function getRating(string memory docHash) public view returns(uint)
    {
        // require(isPresent(docHash), "Document hash is invalid");
        return submissions[docHash].rating;
    }

    function setCost(string memory docHash) public
    {
        require(isPresent(docHash), "Document hash is invalid");
        require(getRating(docHash) >= 0, "Rating invalid");
        submissions[docHash].cost = 100*getRating(docHash);
    }

    function getCost(string memory docHash) public view returns(uint)
    {
        // require(isPresent(docHash), "Document hash is invalid");
        // require(submissions[docHash].cost >= 0, "Cost invalid");
        return submissions[docHash].cost;
    }

    function getReviewers(string memory docHash) public view returns(address[] memory)
    {
        return submissions[docHash].reviewers;
    }

    function getMarks(string memory docHash) public view returns(uint[] memory)
    {
        return submissions[docHash].marks;
    }
    
}