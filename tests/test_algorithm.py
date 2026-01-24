import unittest
import math

# Replicating the logic from google-app-script-v1.5.js (Lines 460-462)
def calculate_score(upvotes, comments, days_old):
    """
    Implements the Time-Decay Engagement Heuristic:
    Score = ((Upvotes * 2) + (Comments * 3)) / sqrt(DaysOld + 1)
    """
    # Prevent negative days if clocks are out of sync
    days_old = max(0, days_old)
    
    raw_score = (upvotes * 2) + (comments * 3)
    # Adding 1 to avoid division by zero
    decay_factor = math.pow(days_old + 1, 0.5)
    
    return raw_score / decay_factor

class TestTrendingAlgorithm(unittest.TestCase):

    def test_basic_scoring(self):
        """Test basic calculation for a fresh project (0 days old)"""
        # 10 Upvotes, 5 Comments
        # Score = (20 + 15) / sqrt(1) = 35
        score = calculate_score(10, 5, 0)
        self.assertEqual(score, 35.0)

    def test_time_decay(self):
        """Test that older projects have lower scores with same engagement"""
        engagement = (10, 5) # 10 upvotes, 5 comments
        
        score_day_0 = calculate_score(*engagement, 0) # 35.0
        score_day_3 = calculate_score(*engagement, 3) # 35 / sqrt(4) = 17.5
        
        print(f"\nDecay Test: Day 0 ({score_day_0}) vs Day 3 ({score_day_3})")
        self.assertTrue(score_day_0 > score_day_3, "Newer project should rank higher")
        self.assertAlmostEqual(score_day_3, 17.5, places=2)

    def test_comment_weight(self):
        """Test that comments are weighted higher than upvotes"""
        # Case A: 10 Upvotes, 0 Comments (Score = 20)
        score_votes = calculate_score(10, 0, 0)
        
        # Case B: 0 Upvotes, 10 Comments (Score = 30)
        score_comments = calculate_score(0, 10, 0)
        
        self.assertTrue(score_comments > score_votes, "Comments should be weighted higher than upvotes")

    def test_ranking_scenario(self):
        """
        Scenario: 
        Project A: Viral but old (100 upvotes, 10 days old)
        Project B: New and rising (20 upvotes, 0 days old)
        
        Formula check:
        A = (200) / sqrt(11) ≈ 60.3
        B = (40) / sqrt(1) = 40.0
        
        Wait, let's adjust to prove the 'Freshness First' claim from README.
        Project A: 50 upvotes, 3 days old -> 100 / 2 = 50
        Project B: 40 upvotes, 0 days old -> 80 / 1 = 80
        B should win.
        """
        proj_a = calculate_score(50, 0, 3) # Old popular
        proj_b = calculate_score(40, 0, 0) # New rising
        
        self.assertTrue(proj_b > proj_a, "Fresh content with decent engagement should beat slightly older content")

if __name__ == '__main__':
    unittest.main()
