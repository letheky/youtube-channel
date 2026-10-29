import sys
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from vsp_tts import context_window_words


class ContextAlignmentTests(unittest.TestCase):
    def test_only_boundary_intersection_of_measured_intervals(self):
        rows=[{'word':'Chặng','start':6.12,'end':6.38},{'word':'trong','start':6.38,'end':6.6}]
        self.assertEqual(context_window_words(rows,6.2,2.4),[{'word':'Chặng','start':0,'end':.18},{'word':'trong','start':.18,'end':.4}])

    def test_cannot_invent_duration_for_zero_time_word(self):
        with self.assertRaises(ValueError):
            context_window_words([{'word':'Chặng','start':6.2,'end':6.2}],6.2,2.4)

    def test_large_boundary_drift_and_overlap_are_rejected(self):
        with self.assertRaises(ValueError):
            context_window_words([{'word':'Chặng','start':5.8,'end':6.5}],6.2,2.4)
        with self.assertRaises(ValueError):
            context_window_words([{'word':'a','start':6.2,'end':6.8},{'word':'b','start':6.6,'end':7}],6.2,2.4)


if __name__=='__main__': unittest.main()
