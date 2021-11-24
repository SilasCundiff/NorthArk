import { Box } from "@mui/system";
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const About = () => {
    return (
        <div className='about d-flex flex-column'>
            <div className='aboutInfo d-flex flex-column flex-md-row'>
                {/* transaction history, account reports, projection reports */}
                <Box className='infoBoxes'>
                    <h3>Transaction History</h3>
                    <ReceiptIcon />
                    <p>Keep track of your banking transaction history. Incoming, outgoing, as far back as your bank will tell us.</p>
                </Box>
                <Box className='infoBoxes'>
                    <h3>Account Reports</h3>
                    <AssessmentIcon />
                    <p>View reports and graphs of your account activity, expenses, and income to get a better view of your account's habits.</p>
                </Box>
                <Box className='infoBoxes'>
                    <h3>Projection Reports</h3>
                    <TrendingUpIcon />
                    <p>Create projection reports for future expenses and income to see how your habits may affect you in the future.</p>
                </Box>
            </div>
        </div>
    )
}

export default About;