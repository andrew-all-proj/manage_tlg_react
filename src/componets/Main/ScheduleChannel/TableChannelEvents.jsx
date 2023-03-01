import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from "react-router-dom";

export function TableChannel({listEvents, idChannel, ...props}) {
    const navigate = useNavigate();

    const click = (id) => {
        if (id === null){
            navigate('/createpost', {replace: false})
        }else{
            navigate(`/post/${id[0]}/${id[1]}`, {replace: false})
        }
    }

    const check_media = (post) => {
        let id_media = ""
        if (post.media.length != 0){
            id_media = post.media[0].id_media
        }
        return id_media
    }

    const cut_string = (str) => {
        if (str.length < 50) return str
        return str.slice(0, 100)
    }

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID-события</TableCell>
                        <TableCell align="center">Дата публикации</TableCell>
                        <TableCell align="center">Дата удаления</TableCell>
                        <TableCell align="center">ID-поста</TableCell>
                        <TableCell align="center">Текст поста</TableCell>
                        <TableCell align="center">ID-медиа</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listEvents.items.map((row) => (
                        <TableRow onClick={() => click(row.post ? [row.post.id_post, row.id_event] : null)}
                            hover={true}
                            key={row.id_event}
                            sx={{ }}
                        >
                            <TableCell align="center">{row.id_event}</TableCell>
                            <TableCell align="center">{row.date_start}</TableCell>
                            <TableCell align="center">{row.date_stop && row.date_stop}</TableCell>
                            <TableCell align="center">{row.post && row.post.id_post}</TableCell>
                            <TableCell align="center">{row.post && cut_string(row.post.text)}</TableCell>
                            <TableCell align="center">{row.post && check_media(row.post) }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}